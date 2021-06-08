import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../componentLibrary";

const TerminalListElement = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  background: #d9eaeb;
  padding: 2px 1px;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
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
