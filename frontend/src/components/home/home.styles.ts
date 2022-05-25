import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    font-family: 'Press Start 2P', 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  color: black;
`;

export const Wrapper = styled.div`
  width: 25%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
