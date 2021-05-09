import styled from "styled-components";
import { MODULE_TYPE } from "../../../models/project";
import { Color, FontType } from "./../../../componentLibrary";

const ModuleBox = styled.div`
  border-right: ${(props: { type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR ? "0px" : `1px solid ${Color.Grey}`};
  border-left: ${(props: { type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR ? "0px" : `1px solid ${Color.Grey}`};
  background: ${Color.LightGrey};
  width: ${(props: { stop: string; type: string }) =>
    props.type === MODULE_TYPE.INSPECTOR ? "100%" : props.stop};
  height: ${(props: { stop: string; type: string }) =>
    props.type !== MODULE_TYPE.INSPECTOR ? "inherit" : props.stop};
  overflow: hidden;
  font-family: ${FontType.Standard};
`;

export default ModuleBox;
