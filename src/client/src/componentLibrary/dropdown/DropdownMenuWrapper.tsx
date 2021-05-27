import styled from "styled-components";
import { Color, FontSize } from "..";

const DropdownMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.White};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  position: relative;
`;

export default DropdownMenuWrapper;
