import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../componentLibrary";

const TypeNameInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  p {
    margin: 0px;
  }

  Input::placeholder,
  Input {
    color: ${Color.Black};
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Standard};
  }
`;

export default TypeNameInput;
