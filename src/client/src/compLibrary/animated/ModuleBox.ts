import styled from "styled-components";
import { MODULE_TYPE } from "../../models/project";
import { Color, Size } from "..";

interface Props {
  type: string;
  stop: number;
}

const ModuleBox = styled.div<Props>`
  border-right: 1px solid ${Color.Grey};
  border-left: ${(props) => props.type !== MODULE_TYPE.LEGEND && "1px solid" + Color.Grey};
  background-color: ${Color.LightGrey};
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

export default ModuleBox;
