import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: inherit;
  height: 198px;
  background: rgba(203, 203, 203, 0.21);

  p {
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Standard};
    color: ${Color.Black};
  }

  .object-icon {
    padding-top: 10px;
    width: 60%;
  }
`;

export default PreviewArea;
