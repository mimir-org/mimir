import styled from "styled-components";
import { Color } from "../../../colors";

const RadioButtonWrapper = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  input {
    display: none;
  }

  .checkmark-circle {
    position: absolute;
    display: flex;
    height: 12px;
    width: 12px;
    background-color: ${Color.White} !important;
    border: 1px solid ${Color.Black};
    border-radius: 10px;
  }

  .checkmark-circle:after {
    display: none;
  }

  input:checked ~ .checkmark-circle:after {
    position: absolute;
    display: flex;
    content: "";
    top: 2.7px;
    left: 2.2px;
    height: 5.5px;
    width: 5.5px;
    background-color: ${Color.Black};
    border: 1px solid ${Color.Black};
    border-radius: 10px;
  }
`;

export default RadioButtonWrapper;
