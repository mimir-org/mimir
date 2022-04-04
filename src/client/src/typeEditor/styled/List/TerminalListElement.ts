import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontType } from "../../../compLibrary/font";

const TerminalListElement = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  padding: 2px 1px;
  font-family: ${FontType.STANDARD};
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};

  :nth-child(odd) {
    background-color: ${Color.LAVANDER_WEB_LIST};
  }
  :nth-child(even) {
    background-color: ${Color.WHITE};
  }

  p {
    margin: 0px;
  }

  Input::placeholder,
  Input {
    background-color: ${Color.WHITE};
    color: ${Color.BLACK};
    font-family: ${FontType.STANDARD};
    font-size: ${FontSize.STANDARD};
  }
`;

export default TerminalListElement;
