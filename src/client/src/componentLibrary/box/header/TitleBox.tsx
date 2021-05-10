import styled from "styled-components";
import { Color, FontSize, FontType } from "../../";

const TitleBox = styled.div`
  position: relative;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  left: 38%;
  width: 175px;
  top: 14px;
  color: ${Color.White};
`;

export default TitleBox;
