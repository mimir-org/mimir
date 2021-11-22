import { createGlobalStyle } from "styled-components";
import { FontType } from "./font";

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: ${FontType.Standard};
    width: 100%;
    margin: 0px;
    padding: 0;
    height: 100%;
    overflow: hidden;
  };

  #root {
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    --avatar-size: 2rem;
  }

  ::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }
  
  ::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 7px;
    background-color: #C4C4C4;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export default GlobalStyle;
