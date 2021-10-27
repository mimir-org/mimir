import { createGlobalStyle } from "styled-components";
import { Color, FontType } from "./";

const GlobalStyle = createGlobalStyle`
  :root {
    --arrow-color: ${Color.TransportConnection};
  }

  body {
    font-family: ${FontType.Standard}
  };

  /* CHECKBOX  */ 
  .checkbox-block {
    position: absolute;
    cursor: pointer;
    left: 7px;
  }

  .checkbox-block input {
    position: absolute;
    opacity: 0;    
    z-index: 1;
  }

  .checkmark-block {
    position: absolute;
    left: 0px;
    height: 11px;
    width: 11px;
    background-color: ${Color.White};
    border: 2px solid ${Color.BlueMagenta};
    border-radius: 2px;
  }

  .checkbox-block input:checked ~ .checkmark-block {
    background-color: ${Color.BlueMagenta};
  }
 
  .checkbox-block input:checked ~ .checkmark-block:after {
    display: block;
  }
  
  .checkmark-block:after {
    content: "";
    position: absolute;
    left: 3px;
    top: -1px;
    width: 3px;
    height: 8px;
    border: solid ${Color.White};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }


  /* SCROLLBAR*/ 
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
