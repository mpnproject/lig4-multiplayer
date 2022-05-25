import styled from "styled-components";

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const Cell = styled.div`
  margin: 2px 2px 2px 2px;
  width: 9em;
  height: 6em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  border: 3px solid black;
  transition: all 270ms ease-in-out;

  &:hover {
    background-color: #8d44ad28;
  }
`;

export const PlayStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

export const PlayerOne = styled.span`
  font-size: 80px;
  color: blue;
  text-align: center;
  display: flex;
  align-items: center;
  &::after {
    content: "o";
  }
`;

export const PlayerTwo = styled.span`
  font-size: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  color: red;
  &::after {
    content: "o";
  }
`;
