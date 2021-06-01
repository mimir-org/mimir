import styled from "styled-components";
import { MODULE_TYPE } from "../../../models/project";
import { Color } from "./../../../componentLibrary";

const ModuleBox = styled.div`
  border-right: 1px solid ${Color.Grey};
  border-left: ${(props: { type: string }) =>
    props.type !== MODULE_TYPE.LEGEND && `1px solid ${Color.Grey}`};
  background: ${Color.LightGrey};
  width: ${(props: { stop: string; type: string }) =>
    props.type !== MODULE_TYPE.LEGEND && `${props.stop}px`};
  height: ${(props: { stop: string; type: string }) =>
    props.type === MODULE_TYPE.LEGEND ? `${props.stop}px` : "100%"};
  position: ${(props) =>
    (props.type === MODULE_TYPE.LEGEND || props.type === MODULE_TYPE.LIBRARY) &&
    "fixed"};
  bottom: ${(props) => props.type === MODULE_TYPE.LEGEND && "0"};
  z-index: 2;
  overflow: hidden;
  position: fixed;
  top: ${(props) => props.type !== MODULE_TYPE.LEGEND && "49px"};
  right: ${(props) => props.type === MODULE_TYPE.LIBRARY && "0"};
`;

export default ModuleBox;
