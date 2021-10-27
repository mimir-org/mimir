import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../compLibrary";
import { GetPropertiesHeight } from "../../helpers/GetPropertiesHeight";

const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${GetPropertiesHeight(false) - 100}px;
  background: #f7f7f7;
  border: 1px solid ${Color.Black};
  border-radius: 5px;

  p {
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Medium};
    color: ${Color.Black};
  }
`;

export default PreviewArea;
