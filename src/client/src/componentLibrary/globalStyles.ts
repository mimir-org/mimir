import { createGlobalStyle } from "styled-components";
import { Color, FontType } from "./";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${FontType.Standard};
  }

  .checkbox {
    display: flex;
    position: relative;
    padding: 0px 0px 7px 25px;
    cursor: pointer;
    font-size: 14px;
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
    border: 2px solid ${Color.DeepCyan};
    border-radius: 3px;
  }

  .checkbox input:checked ~ .checkmark {
    background-color: ${Color.DeepCyan};
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .checkbox input:checked ~ .checkmark:after {
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

  ::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }
  ::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 7px;
    -webkit-border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
  
`;

export default GlobalStyle;
