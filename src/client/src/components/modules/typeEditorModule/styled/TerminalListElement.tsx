import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const TerminalListElement = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: inherit;
  padding: 2px 1px;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  background-color: inherit;

  p {
    margin: 0px;
  }

  Input::placeholder,
  Input {
    background-color: ${Color.White};
    color: ${Color.Black};
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Standard};
  }
`;

export default TerminalListElement;
