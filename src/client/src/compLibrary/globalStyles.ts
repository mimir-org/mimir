import { createGlobalStyle } from "styled-components";
import { FontType } from "./font";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${FontType.Standard}
  };

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
