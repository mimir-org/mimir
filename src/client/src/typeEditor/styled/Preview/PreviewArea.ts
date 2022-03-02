import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 50px);
  background: #f7f7f7;
  border: 1px solid ${Color.BLACK};
  border-radius: 5px;
  overflow: hidden;

  p {
    font-family: ${FontType.STANDARD};
    font-size: ${FontSize.MEDIUM};
    color: ${Color.BLACK};
  }
`;

export default PreviewArea;
