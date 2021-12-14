import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary/colors";

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${Color.Black};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 34px;
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
`;

export default MenuList;
