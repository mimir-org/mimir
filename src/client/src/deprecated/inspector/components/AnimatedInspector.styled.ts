import styled from "styled-components";
import { Size } from "../../../assets/size/Size";
import { Color } from "../../../assets/color/Color";

interface AnimatedInspectorContainerProps {
  isInspectorOpen: boolean;
  isLibraryOpen?: boolean;
  isExplorerOpen?: boolean;
  stop: number;
  zIndex: number;
}

export const AnimatedInspectorContainer = styled.div<AnimatedInspectorContainerProps>`
  pointer-events: ${(props) => (props.isInspectorOpen ? "initial" : "none")};
  color: ${Color.BLACK};
  height: ${(props) => props.stop}px;
  max-height: 89vh;
  min-height: ${Size.MODULE_CLOSED}px;
  width: auto;
  min-width: 650px;
  z-index: ${(props) => props.zIndex};
  position: absolute;
  bottom: 0;
  background-color: ${Color.CULTURED};
  right: ${(props) => (props.isLibraryOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
  left: ${(props) => (props.isExplorerOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
  overflow-x: auto;
  overflow-y: hidden;
  transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
`;
