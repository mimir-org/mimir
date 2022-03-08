import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface ToolElementBoxProps {
  active: boolean;
}

export const ToolElementBox = styled.div<ToolElementBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 60px;
  cursor: pointer;

  :hover {
    background-color: ${Color.BLUE_LIGHT};
  }

  &:first-child {
    background-color: ${(props) => props.active && Color.GREY_TOOLBAR_SELECTED};
    border-left: 1px solid ${Color.GREY};
    border-right: 1px solid ${Color.GREY};
  }

  &:nth-child(2) {
    background-color: ${(props) => !props.active && Color.GREY_TOOLBAR_SELECTED};
  }

  &:last-child {
    border-left: 1px solid ${Color.GREY};
    background-color: ${(props) => props.active && Color.GREY_TOOLBAR_SELECTED};
  }
`;
