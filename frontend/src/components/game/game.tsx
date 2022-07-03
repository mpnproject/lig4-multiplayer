import React, { useCallback, useContext, useEffect, useState } from "react";
import gameContext from "../../utils/gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import {
  GameContainer,
  RowContainer,
  Cell,
  PlayStopper,
  PlayerOne,
  PlayerTwo,
} from "./game.styles";
import { IPlayMatrix } from "./types";

export const Game: React.FC = () => {
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ]);

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useContext(gameContext);

  const checkMatrixState = (matrixCompose: (string | null)[][], column: number, row: number, symbol: string) => {
    const matrixLength = matrixCompose.length - 1;

    for (let rowIdx = matrixLength; rowIdx >= 0; rowIdx--) {
      if (matrixCompose[rowIdx][column] === null) {
        matrixCompose[rowIdx][column] = symbol;
        setMatrix(matrixCompose);
        break;
      }
    }

    return matrixCompose;
  };

  const checkGameState = (matrix: IPlayMatrix) => {

    console.log("teste");

    return [false, false];
  };

  const updateGameMatrix = (column: number, row: number, symbol: string) => {
    let matrixCompose = [...matrix];
   
    const newMatrix = checkMatrixState(matrixCompose, column, row, symbol);

    if (socketService.socket) {
      gameService.updateGame(socketService.socket, newMatrix);
      const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);
      if (currentPlayerWon && otherPlayerWon) {
        gameService.gameWin(socketService.socket, "The Game is a TIE!");
        alert("The Game is a TIE!");
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socketService.socket, "You Lost!");
        alert("You Won!");
      }

      setPlayerTurn(false);
    }
  };

  const handleGameUpdate = useCallback(() => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        setMatrix(newMatrix);
        checkGameState(newMatrix);
        setPlayerTurn(true);
      });
  }, [setPlayerTurn]);

  const handleGameStart = useCallback(() => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  }, [setGameStarted, setPlayerSymbol, setPlayerTurn]);

  const handleGameWin = useCallback(() => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        console.log("Here", message);
        setPlayerTurn(false);
        alert(message);
      });
  }, [setPlayerTurn]);

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, [handleGameStart, handleGameUpdate, handleGameWin]);

  return (
    <GameContainer>
      {!isGameStarted && (
        <h2>waiting player!</h2>
      )}
      {(!isGameStarted || !isPlayerTurn) && <PlayStopper />}
      {matrix.map((row, rowIdx) => (
        <RowContainer key={rowIdx}>
          {row.map((column, columnIdx) => (
            <Cell
              key={columnIdx}
              onClick={() => {
                console.log("playerSymbol", playerSymbol);
                updateGameMatrix(columnIdx, rowIdx, playerSymbol)
              }
                
              }
            >
              {column && column !== "null" ? (
                column === "o" ? (
                  <PlayerOne />
                ) : (
                  <PlayerTwo />
                )
              ) : null}
            </Cell>
          ))}
        </RowContainer>
      ))}
    </GameContainer>
  );
}