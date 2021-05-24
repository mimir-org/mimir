import styled from "styled-components";
import { MODULE_TYPE } from "../../../models/project";
import { Color } from "./../../../componentLibrary";

const ModuleBox = styled.div`
  border-right: ${(props: { type: string }) =>
    props.type !== MODULE_TYPE.INSPECTOR && `1px solid ${Color.Grey}`};
  border-left: ${(props: { type: string }) =>
    props.type !== MODULE_TYPE.INSPECTOR && `1px solid ${Color.Grey}`};
  background: ${Color.LightGrey};
  width: ${(props: { stop: string; type: string }) =>
    props.type !== MODULE_TYPE.INSPECTOR && props.stop};
  height: ${(props: { stop: string; type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR && props.stop};
  overflow: hidden;
  z-index: 1;
`;

export default ModuleBox;
