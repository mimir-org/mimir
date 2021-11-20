import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize } from "../../font";

const NumericInput = styled.div`
  input {
    padding: 2px 0px;
    width: 18px;
    max-height: 20px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid ${Color.BlueMagenta};
  }
  textarea:focus,
  input:focus {
    outline: none;
  }

  input[type="number"] {
    font-size: ${FontSize.Medium};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default NumericInput;