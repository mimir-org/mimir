import { createGlobalStyle } from "styled-components";
import { FontType } from "../assets/font";

export const GlobalStyle = createGlobalStyle`
  // CSS RESET (https://www.joshwcomeau.com/css/custom-css-reset/)
  *, *::before, *::after {
    box-sizing: border-box;
  }

  img, picture, video, canvas, svg {
    max-width: 100%;
  }

  body, html {
    height: 100%;
    margin: 0;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
  }

  // APPLICATION SPECIFIC GLOBALS
  html, body {
    font-family: ${FontType.STANDARD};
  };

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
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

  hr {
    width: 90%;
    margin-top: 0;
    margin-bottom: 0;
  }
`;
