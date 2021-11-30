import styled from "styled-components";
import { Color } from "../../../../colors";

interface Props {
  color: string;
  leftPos: number;
}

const CheckboxWrapper = styled.label<Props>`
  cursor: pointer;
  position: absolute;
  left: ${(props) => props.leftPos}px;
  padding-bottom: 15px;

  input {
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark {
    background-color: ${(props) => props.color} !important;
  }

  .checkmark {
    position: absolute;
    left: 0;
    height: 11px;
    width: 11px;
    background-color: ${Color.White} !important;
    border: 2px solid ${(props) => props.color};
    border-radius: 3px;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    left: 3px;
    top: -0.5px;
    width: 3px;
    height: 7px;
    border: solid ${Color.White};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export default CheckboxWrapper;
