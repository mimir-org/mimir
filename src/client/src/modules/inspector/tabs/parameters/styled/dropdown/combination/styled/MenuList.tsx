import styled from "styled-components";

export const MENU_LIST_ITEM_BORDER_WIDTH: number = 1.5;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${(props) => props.color};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 31px;
  left: 0;
  width: 60%;
  max-height: 138px;
  overflow-y: auto;
  z-index: 1;

  div:not(:first-child) {
    border-top: ${MENU_LIST_ITEM_BORDER_WIDTH}px solid ${(props) => props.color};
  }
`;

export default MenuList;
