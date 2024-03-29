import styled from "styled-components";
import { Color } from "../../../assets/color/Color";

interface ToolElementBoxProps {
  active: boolean;
  borderLeft: boolean;
  borderRight: boolean;
  clickable: boolean;
}

export const ToolElementBox = styled.button<ToolElementBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 60px;
  background-color: ${(props) => (props.active ? Color.DIM_GREY : "transparent")};
  border-width: 0;
  border-left: ${(props) => props.borderLeft && 1}px;
  border-right: ${(props) => props.borderRight && 1}px;
  border-style: solid;
  border-color: ${Color.GAINSBORO};
  cursor: ${(props) => (props.clickable ? "pointer" : "not-allowed")};

  :hover {
    background-color: ${(props) => props.clickable && Color.LAVANDER_WEB_HOVER};
  }
`;
