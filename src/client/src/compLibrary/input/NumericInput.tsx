import styled from "styled-components";
import Color from "../colors/Color";

const NumericInput = styled.div`
  input {
    width: 20px;
    height: 17px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid ${Color.DeepCyan};
    margin: 0px 6px;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default NumericInput;
