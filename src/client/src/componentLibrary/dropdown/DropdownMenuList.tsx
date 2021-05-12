import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const DropdownMenuList = styled.div`
  display: flex;
  width: 183px;
  flex-direction: column;
  align-items: center;
  border-width: 0px 1.5px 1.5px 1.5px;
  border-style: solid;
  border-color: ${Color.Grey};
  border-radius: 5px;
  background-color: none;
`;

export default DropdownMenuList;
