import styled from "styled-components";
import { Color } from "../../../../colors";

interface Props {
  color: string;
  marginLeft: number;
}

const CheckboxWrapper = styled.span<Props>`
  cursor: pointer;
  position: absolute;
  left: 7px;
  padding-bottom: 15px;
  margin-left: ${(props) => props.marginLeft}px;

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
    height: 15px;
    width: 15px;
    background-color: ${Color.White} !important;
    border: 2px solid ${(props) => props.color};
    border-radius: 3px;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    left: 2.5px;
    right: 0;
    bottom: 3px;
    width: 6px;
    height: 8px;
    border: solid ${Color.White};
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export default CheckboxWrapper;
