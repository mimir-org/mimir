import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

const CheckboxWrapper = styled.label`
  cursor: pointer;
  position: absolute;
  left: 7px;

  input {
    position: absolute;
    opacity: 0;
  }

  input:checked ~ .checkmark {
    background-color: ${Color.DarkGrey};
  }

  .checkmark {
    position: absolute;
    left: 0;
    height: 11px;
    width: 11px;
    background-color: ${Color.White};
    border: 2px solid ${Color.DarkGrey};
    border-radius: 3px;
  }

  .checkmark:after {
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

  .label {
    position: relative;
    top: 1px;
  }
`;

export default CheckboxWrapper;
