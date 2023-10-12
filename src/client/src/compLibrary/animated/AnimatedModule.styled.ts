import styled from "styled-components";
import { MODULE_TYPE } from "../../models/project";
import { Size } from "../../assets/size/Size";
import { Color } from "../../assets/color/Color";

interface ModuleBoxProps {
  type: string;
  stop: number;
  libOpen: boolean;
  explorerOpen: boolean;
}

export const ModuleBox = styled.div<ModuleBoxProps>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${Color.GAINSBORO};
  border-left: ${(props) => props.type !== MODULE_TYPE.LEGEND && "1px solid" + Color.GAINSBORO};
  background-color: ${Color.GHOST_WHITE};
  z-index: 5;
  overflow: hidden;
  position: fixed;
`;

export const VerticalModuleBox = styled(ModuleBox)`
  width: ${(props) => props.stop}px;
  height: 100%;
  top: ${Size.TOPMENU_HEIGHT}px;
  right: ${(props) => props.type === MODULE_TYPE.LIBRARY && "0"};
`;

export const HorizontalModuleBox = styled(ModuleBox)`
  width: auto;
  height: ${(props) => props.stop}px;
  bottom: 0;
  right: ${(props) => (props.libOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
  left: ${(props) => (props.explorerOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED)}px;
`;
