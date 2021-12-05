import styled from "styled-components";
import { FontSize, FontWeight } from "../../../../../compLibrary/font";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  .label {
    display: flex;
    margin-bottom: 5px;
    font-size: ${FontSize.Medium};
    font-weight: ${FontWeight.Normal};
  }
`;

export default InputBox;
