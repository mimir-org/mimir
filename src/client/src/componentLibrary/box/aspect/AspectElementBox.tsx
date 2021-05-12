import styled from "styled-components";
import { UseIndentLevel, GetAspectColor } from "../../../assets/helpers";
import { NodeType } from "../../../models/project";

const AspectChildBox = styled.div`
  padding-bottom: 9px;
  padding-left: ${(props: { indent: number }) =>
    UseIndentLevel(props.indent)}px;
  background-color: ${(props: { type: NodeType }) =>
    GetAspectColor(props.type, true)};
`;

export default AspectChildBox;
