import styled from "styled-components";
import { Color } from "../../assets/color/Color";
import { Size } from "../../assets/size/Size";

interface ToolbarBoxProps {
  libOpen: boolean;
  explorerOpen: boolean;
}

export const ToolbarBox = styled.div<ToolbarBoxProps>`
  display: flex;
  justify-content: space-between;

  background-color: ${Color.WHITE};
  color: ${Color.BLACK};
  height: 40px;
  width: auto;
  border-bottom: 1px solid ${Color.GAINSBORO};
  position: absolute;
  top: ${Size.TOPMENU_HEIGHT}px;
  transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
  z-index: 5;

  right: ${(props) => (props.libOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
  left: ${(props) => (props.explorerOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
`;

export const ToolbarButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;
