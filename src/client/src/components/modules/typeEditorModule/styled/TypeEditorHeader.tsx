import styled from "styled-components";
import { Color, FontSize } from "../../../../compLibrary";

const TypeEditorHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 4px 0px 0px 16px;
    font-weight: bold;
    font-size: ${FontSize.Header};
    color: ${Color.Black};
  }

  img {
    cursor: pointer;
  }
`;

export default TypeEditorHeader;
