import styled from "styled-components";
import { Color } from "..";

const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 0px 1.6px 1.6px 1.6px;
  border-style: solid;
  border-color: ${Color.Grey};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 49.2px;
  left: -1px;
  z-index: 1;
  width: 99%;
`;

export default DropdownMenuList;
