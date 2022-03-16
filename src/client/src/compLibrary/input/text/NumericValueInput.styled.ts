import styled from "styled-components";
import { Color } from "../../colors/Color";
import { FontSize } from "../../font";

export const NumericValueInputStyled = styled.div`
  input {
    width: 20px;
    height: 20px;
    max-height: 20px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid ${Color.BASTILLE};
  }
  textarea:focus,
  input:focus {
    outline: none;
  }

  input[type="number"] {
    font-size: ${FontSize.MEDIUM};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
