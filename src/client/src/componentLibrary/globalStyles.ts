import { createGlobalStyle } from "styled-components";
import FontType from "./font/FontType";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: ${FontType.Standard}
  }
`;

export default GlobalStyle;
