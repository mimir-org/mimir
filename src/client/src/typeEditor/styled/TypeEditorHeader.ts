import styled from "styled-components";
import { Color } from "../../compLibrary/colors/Color";
import { FontSize } from "../../compLibrary/font";

const TypeEditorHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 13px 0px 0px 20px;
    font-weight: bold;
    font-size: ${FontSize.HEADER};
    color: ${Color.BLACK};
  }

  img {
    margin: 18px 16px 0px 0px;
    cursor: pointer;
  }
`;

export default TypeEditorHeader;
