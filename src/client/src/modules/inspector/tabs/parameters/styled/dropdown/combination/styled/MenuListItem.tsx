import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../../compLibrary";

export const MENU_LIST_ITEM_HEIGHT: number = 27;

const MenuListItem = styled.div`
  display: flex;
  position: relative;
  height: ${MENU_LIST_ITEM_HEIGHT}px;
  max-height: 45px;
  align-items: center;
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;

  .label {
    height: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px;
    margin-left: 22px;
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${(props) => props.color};
    div {
      text-decoration: underline;
    }
    .tooltipText {
      visibility: visible;
    }
  }
`;

export default MenuListItem;
