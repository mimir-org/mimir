import styled from "styled-components";
import { Color, FontSize } from "../../../../../compLibrary";

const MenuListItem = styled.div`
  display: flex;
  height: 31px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${Color.DarkGrey};
  font-size: ${FontSize.Medium};
  color: ${Color.Black};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 10px;
    margin-left: 23px;
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${Color.LightBlue};
    p {
      text-decoration: underline;
    }
  }

  &:first-child {
    border-radius: 5px 5px 0px 0px;
    border: none;
  }

  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }
`;

export default MenuListItem;
