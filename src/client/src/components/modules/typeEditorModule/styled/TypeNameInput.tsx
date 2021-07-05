import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const TypeNameInput = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-right: 15px;
  color: ${Color.Black};
  font-size: ${FontSize.Standard};
  font-family: ${FontType.Standard};
  margin-top: -14px;

  p {
    margin-bottom: 4px;
  }

  input::placeholder {
    color: ${Color.Black};
    font-size: ${FontSize.Standard};
    font-family: ${FontType.Standard};
  }
`;

export default TypeNameInput;
