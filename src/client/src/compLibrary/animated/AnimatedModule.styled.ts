import styled from "styled-components";
import { MODULE_TYPE } from "../../models/project";
import { Size } from "../size";
import { Color } from "../colors/";

interface ModuleBoxProps {
  type: string;
  stop: number;
}

export const ModuleBox = styled.div<ModuleBoxProps>`
  border-right: 1px solid ${Color.Grey};
  border-left: ${(props) => props.type !== MODULE_TYPE.LEGEND && "1px solid" + Color.Grey};
  background-color: ${Color.GreyLighter};
  width: ${(props) => props.type !== MODULE_TYPE.LEGEND && props.stop}px;
  height: ${(props) => (props.type === MODULE_TYPE.LEGEND ? props.stop + "px" : "100%")};
  position: ${(props) => (props.type === MODULE_TYPE.LEGEND || props.type === MODULE_TYPE.LIBRARY) && "fixed"};
  bottom: ${(props) => props.type === MODULE_TYPE.LEGEND && "0"};
  right: ${(props) => props.type === MODULE_TYPE.LIBRARY && "0"};
  top: ${(props) => props.type !== MODULE_TYPE.LEGEND && Size.TopMenu_Height}px;
  z-index: 5;
  overflow: hidden;
  position: fixed;
`;
