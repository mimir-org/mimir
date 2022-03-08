import styled from "styled-components";
import { Color } from "../../compLibrary/colors";
import { Size } from "../../compLibrary/size";

interface ToolBarBoxProps {
  libOpen: boolean;
  explorerOpen: boolean;
}

export const ToolBarBox = styled.div<ToolBarBoxProps>`
  background-color: ${Color.WHITE};
  color: ${Color.BLACK};
  height: 40px;
  width: auto;
  border-bottom: 1px solid ${Color.GREY};
  position: absolute;
  top: ${Size.TOPMENU_HEIGHT}px;
  display: inline;
  transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
  z-index: 5;

  right: ${(props) => (props.libOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
  left: ${(props) => (props.explorerOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
`;

export const ToolBarBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: auto;
  height: 40px;
`;
