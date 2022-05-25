import { useEffect, useState } from "react";
import { HomeWrapper, Title, Wrapper, GlobalStyle } from "./components/home/home.styles";
import socketService from "./services/socketService";
import { JoinRoom } from "./components/join-room/join-room";
import GameContext, { IGameContextProps } from "./utils/gameContext";
import { Game } from "./components/game/game";

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState("o");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <GlobalStyle />
      <div>
      <HomeWrapper>
        <Title>Lig4 Game</Title>
        <Wrapper>
          {!isInRoom && <JoinRoom />}
          {isInRoom && <Game />}
        </Wrapper>
      </HomeWrapper>
      </div>

    </GameContext.Provider>
  );
}

export default App;
