import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";

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
    background-color: ${Color.LAVANDER_WEB_HOVER};
  }

  &:first-child {
    background-color: ${(props) => props.active && Color.DIM_GREY};
    border-left: 1px solid ${Color.GAINSBORO};
    border-right: 1px solid ${Color.GAINSBORO};
  }

  &:nth-child(2) {
    background-color: ${(props) => !props.active && Color.DIM_GREY};
  }

  &:last-child {
    border-left: 1px solid ${Color.GAINSBORO};
    background-color: ${(props) => props.active && Color.DIM_GREY};
  }
`;
