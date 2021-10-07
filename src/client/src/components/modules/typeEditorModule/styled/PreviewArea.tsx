import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../compLibrary";

const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 240px;
  background: #f7f7f7;

  p {
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Medium};
    color: ${Color.Black};
  }

  .object-icon {
    padding-top: 10px;
    max-width: 180px;
    min-height: 50px;
    max-height: 100px;
  }
`;

export default PreviewArea;
