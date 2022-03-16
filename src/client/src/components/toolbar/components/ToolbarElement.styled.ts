import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface ToolElementBoxProps {
  active: boolean;
  borderLeft: boolean;
  borderRight: boolean;
  isLeftMenu: boolean;
  leftMargin: number;
}

export const ToolElementBox = styled.div<ToolElementBoxProps>`
  position: ${(props) => props.isLeftMenu && "absolute"};
  left: ${(props) => props.leftMargin}px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 60px;
  cursor: pointer;
  background-color: ${(props) => props.active && Color.GREY_TOOLBAR_SELECTED};
  border-width: 0;
  border-left: ${(props) => props.borderLeft && 1}px;
  border-right: ${(props) => props.borderRight && 1}px;
  border-style: solid;
  border-color: ${Color.GREY};

  :hover {
    background-color: ${Color.BLUE_LIGHT};
  }
`;
