import styled from "styled-components";
import { MODULE_TYPE } from "../../models/project";
import { Size } from "../size/Size";
import { Color } from "../colors/Color";

interface ModuleBoxProps {
  type: string;
  stop: number;
}

export const ModuleBox = styled.div<ModuleBoxProps>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${Color.GREY};
  border-left: ${(props) => props.type !== MODULE_TYPE.LEGEND && "1px solid" + Color.GREY};
  background-color: ${Color.GREY_LIGHTER};
  width: ${(props) => props.type !== MODULE_TYPE.LEGEND && props.stop}px;
  height: ${(props) => (props.type === MODULE_TYPE.LEGEND ? props.stop + "px" : "100%")};
  bottom: ${(props) => props.type === MODULE_TYPE.LEGEND && "0"};
  right: ${(props) => props.type === MODULE_TYPE.LIBRARY && "0"};
  top: ${(props) => props.type !== MODULE_TYPE.LEGEND && Size.TOPMENU_HEIGHT}px;
  z-index: 5;
  overflow: hidden;
  position: fixed;
`;
