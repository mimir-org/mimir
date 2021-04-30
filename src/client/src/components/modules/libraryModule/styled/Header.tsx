import styled from "styled-components";
import { Color, FontSize, FontType } from "../../../../componentLibrary";

const Header = styled.div`
  margin-left: 120px;
  font-family: ${FontType.Standard};
  color: ${Color.Black};
  font-size: ${FontSize.Header};
  display: inline-flex;
  align-items: center;
`;

export default Header;
