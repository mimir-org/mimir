import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const TerminalListElement = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  padding: 2px 1px;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  :nth-child(odd) {
    background-color: #d9eaeb;
  }
  :nth-child(even) {
    background-color: ${Color.White};
  }
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
