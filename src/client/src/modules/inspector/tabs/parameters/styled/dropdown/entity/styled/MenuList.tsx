import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary";

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${Color.ParamsPurple};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 31px;
  left: 0;
  width: 98%;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1;
`;

export default MenuList;
