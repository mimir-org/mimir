import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const DropdownMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.White};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
`;

export default DropdownMenuWrapper;
