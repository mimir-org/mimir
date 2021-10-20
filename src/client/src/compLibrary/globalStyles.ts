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
  .checkbox  {
    display: flex;
    position: relative;
    padding: 0px 0px 7px 25px;
    cursor: pointer;
    font-size: 14px;
  }

  .checkbox-block, .checkbox-terminals {
    position: absolute;
    cursor: pointer;
    left: 7px;
  }

  .checkbox-block input, .checkbox-terminals input {
    position: absolute;
    opacity: 0;    
    z-index:1;
  }
  
  .checkbox input {
    position: absolute;
    opacity: 0;
  }
 
  .checkmark {
    position: absolute;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: ${Color.White};
    border: 2px solid ${Color.BlueMagenta};
    border-radius: 3px;
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

  .checkmark-terminals {
    position: absolute;
    left: 0px;
    height: 11px;
    width: 11px;
    background-color: ${Color.White};
    border: 2px solid ${Color.DarkGrey};
    border-radius: 2px;
  }

  .checkbox input:checked ~ .checkmark {
    background-color: ${Color.BlueMagenta};
  }

  .checkbox-block input:checked ~ .checkmark-block {
    background-color: ${Color.BlueMagenta};
  }

  .checkbox-terminals input:checked ~ .checkmark-terminals {
    background-color: ${Color.DarkGrey};
  }

  .checkmark:after,
  .checkmark-block:after,
  .checkmark-terminals:after {
    content: "";
    position: absolute;
    display: none;
  }

  .checkbox input:checked ~ .checkmark:after,
  .checkbox-block input:checked ~ .checkmark-block:after,
  .checkbox-terminals input:checked ~ .checkmark-terminals:after {
    display: block;
  }
  
  .checkbox .checkmark:after {
    left: 5px;
    top: 0px;
    width: 4px;
    height: 10px;
    border: solid ${Color.White};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .checkmark-block:after,
  .checkmark-terminals:after {
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
