import styled from "styled-components";
import { MODULE_TYPE } from "../../models/project";
import { Size } from "../../assets/size/Size";
import { Color } from "../../assets/color/Color";

interface ModuleBoxProps {
  type: string;
  stop: number;
}

export const ModuleBox = styled.div<ModuleBoxProps>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${Color.GAINSBORO};
  border-left: ${(props) => props.type !== MODULE_TYPE.LEGEND && "1px solid" + Color.GAINSBORO};
  background-color: ${Color.GHOST_WHITE};
  width: ${(props) => props.type !== MODULE_TYPE.LEGEND && props.stop}px;
  height: ${(props) => (props.type === MODULE_TYPE.LEGEND ? props.stop + "px" : "100%")};
  bottom: ${(props) => props.type === MODULE_TYPE.LEGEND && "0"};
  right: ${(props) => props.type === MODULE_TYPE.LIBRARY && "0"};
  top: ${(props) => props.type !== MODULE_TYPE.LEGEND && Size.TOPMENU_HEIGHT}px;
  z-index: 5;
  overflow: hidden;
  position: fixed;
`;
