import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../componentLibrary";

const TerminalListElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: inherit;
  height: 34px;
  background: #d9eaeb;
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

  img {
    margin-left: auto;
    padding-right: 8px;
    width: 13px;
    height: 13px;
  }
`;

export default TerminalListElement;
