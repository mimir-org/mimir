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
  .checkbox-block  {
    position: absolute;
    cursor: pointer;
    left: 7px;
  }

  .checkbox-filter  {
    display: flex;
    position: relative;
    padding: 0px 0px 7px 25px;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 7px;
  }

  .checkbox-filter input {
    position: absolute;
    opacity: 0;
  }

  .checkbox-block input {
    position: absolute;
    opacity: 0;
  }
  .checkbox input {
    position: absolute;
    opacity: 0;
  }
 
  .checkmark,
  .checkmark-footer {
    position: absolute;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: ${Color.White};
    border: 2px solid ${Color.DeepCyan};
    border-radius: 3px;
  }
  .checkmark-block {
    position: absolute;
    left: 0px;
    height: 11px;
    width: 11px;
    background-color: ${Color.White};
    border: 2px solid ${Color.Black};
    border-radius: 2px;
  }

  .checkmark-filter {
    position: absolute;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: ${Color.White};
    border: 2px solid ${Color.Black};
    border-radius: 3px;
  }

  .checkmark-footer {
    left: 5px;
    top: -5px;
  }
  .checkbox input:checked ~ .checkmark {
    background-color: ${Color.DeepCyan};
  }
  .checkbox input:checked ~ .checkmark-footer {
    background-color: ${Color.White};
  }
  .checkbox-block input:checked ~ .checkmark-block {
    background-color: ${Color.Black};
  }
  .checkbox-filter input:checked ~ .checkmark-filter {
    background-color: ${Color.Black};
  }

  .checkmark:after,
  .checkmark-footer:after,
  .checkmark-block:after,
  .checkmark-filter:after {
    content: "";
    position: absolute;
    display: none;
  }
  .checkbox input:checked ~ .checkmark:after,
  .checkbox-block input:checked ~ .checkmark-block:after,
  .checkbox-filter input:checked ~ .checkmark-filter:after,
  .checkbox input:checked ~ .checkmark-footer:after {
    display: block;
  }
  
  .checkbox .checkmark:after,
  .checkmark-footer:after {
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
  .checkmark-block:after {
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

  .checkmark-filter:after {
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

  .checkbox .checkmark-footer:after {
    border: solid ${Color.DeepCyan};
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
    -webkit-border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
`;

export default GlobalStyle;
