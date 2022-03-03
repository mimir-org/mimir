import styled from "styled-components";
import { Color } from "../../colors";

export const RadioButtonWrapper = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  --radioButtonSize: 12px;

  input {
    display: none;
  }

  .checkmark-circle {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--radioButtonSize);
    width: var(--radioButtonSize);
    background-color: ${Color.WHITE} !important;
    border: 1px solid ${Color.BLUE_MAGENTA};
    border-radius: 10px;
  }

  .checkmark-circle:after {
    display: none;
  }

  input:checked ~ .checkmark-circle:after {
    display: flex;
    content: "";
    width: calc(var(--radioButtonSize) / 2);
    height: calc(var(--radioButtonSize) / 2);
    border-radius: 50%;
    background-color: ${Color.BLUE_MAGENTA};
    border: 1px solid ${Color.BLUE_MAGENTA};
  }
`;
