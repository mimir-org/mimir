import styled from "styled-components";
import { Color, FontSize } from "../../../../compLibrary";

const TypeEditorHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 13px 0px 0px 20px;
    font-weight: bold;
    font-size: ${FontSize.Header};
    color: ${Color.Black};
  }

  img {
    margin: 18px 16px 0px 0px;
    cursor: pointer;
  }
`;

export default TypeEditorHeader;
