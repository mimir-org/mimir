import styled from "styled-components";
import { Color } from "../../../";

const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${Color.Black};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 62px;
  left: 0;
  z-index: 1;
  width: 99%;
  max-height: 250px;
  overflow-y: auto;
`;

export default DropdownMenuList;
