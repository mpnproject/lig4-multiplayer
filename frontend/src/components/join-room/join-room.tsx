import React, { useContext, useState } from "react";
import gameContext from "../../utils/gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import { 
  JoinRoomContainer,
  RoomIdInput,
  JoinButton
} from "./join-room.styles"; 

interface IJoinRoomProps {};

export const JoinRoom: React.FC<IJoinRoomProps> = (props) => {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom } = useContext(gameContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <JoinRoomContainer>
        <h4>Create/Join in a room</h4>
        <RoomIdInput
          placeholder="Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <JoinButton type="submit" disabled={isJoining}>
          {isJoining ? "Joining..." : "Joing"}
        </JoinButton>
      </JoinRoomContainer>
    </form>
  );
}
