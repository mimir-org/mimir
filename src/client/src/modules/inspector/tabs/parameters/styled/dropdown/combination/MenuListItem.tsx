import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../compLibrary/font";

const MenuListItem = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 5px;
  height: 25px;
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  overflow: hidden;

  & > span {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  :hover {
    background-color: ${(props) => props.color};
    span {
      text-decoration: underline;
    }
    .tooltipText {
      visibility: visible;
    }
  }
`;

export default MenuListItem;
