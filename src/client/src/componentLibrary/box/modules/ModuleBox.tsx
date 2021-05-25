import styled from "styled-components";
import { MODULE_TYPE } from "../../../models/project";
import { Color } from "./../../../componentLibrary";

const ModuleBox = styled.div`
  border-right: ${(props: { type: string }) =>
    props.type !== MODULE_TYPE.INSPECTOR && `1px solid ${Color.Grey}`};
  border-left: ${(props: { type: string }) =>
    props.type !== MODULE_TYPE.INSPECTOR &&
    props.type !== MODULE_TYPE.LEGEND &&
    `1px solid ${Color.Grey}`};
  background: ${Color.LightGrey};
  width: ${(props: { stop: string; type: string }) =>
    props.type !== MODULE_TYPE.INSPECTOR &&
    props.type !== MODULE_TYPE.LEGEND &&
    `${props.stop}px`};
  height: ${(props: { stop: string; type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR || props.type === MODULE_TYPE.LEGEND
      ? `${props.stop}px`
      : "auto"};
  overflow: hidden;
  position: ${(props) => props.type === MODULE_TYPE.LEGEND && "fixed"};
  bottom: ${(props) => props.type === MODULE_TYPE.LEGEND && "0"};
`;

export default ModuleBox;
