import styled from "styled-components";
import { Color } from "../../../../compLibrary";

interface Props {
  color: string;
}

const CheckboxWrapper = styled.label<Props>`
  display: flex;
  position: relative;
  padding: 2px 0px 0px 25px;
  cursor: pointer;
  font-size: 14px;

  input {
    position: absolute;
    opacity: 0;
  }

  input:checked ~ .checkmark {
    background-color: ${(props) => props.color};
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

  .label {
    position: relative;
    top: 1px;
  }
`;

export default CheckboxWrapper;
