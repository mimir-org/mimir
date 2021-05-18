import styled from "styled-components";
import { Color, FontSize } from "../../../../componentLibrary";

const TypeNameInput = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  p {
    margin: 0px;
  }

  Input::placeholder,
  Input {
    color: ${Color.Black};
    font-size: ${FontSize.Standard};
  }
`;

export default TypeNameInput;
