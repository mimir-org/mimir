import styled from "styled-components";
import { Color } from "..";

const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 0px 1.5px 1.5px 1.5px;
  border-style: solid;
  border-color: ${Color.Grey};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 1;
  width: 99%;
`;

export default DropdownMenuList;
