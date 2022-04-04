import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontType } from "../../../compLibrary/font";

const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 50px);
  background: ${Color.DARK_WHITE_SMOKE};
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
