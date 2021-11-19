import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

const MenuListBox = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${Color.Black};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 32px;
  left: 0;
  width: 96%;
  max-height: 850px;
  margin-left: 10px;
  z-index: 1;
`;

export default MenuListBox;
