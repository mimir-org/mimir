import styled from "styled-components";
import { CalculateIndentLevel, GetAspectColor } from "../../../assets/helpers";
import { NodeType } from "../../../models/project";

const AspectChildBox = styled.div`
  padding-bottom: 9px;
  padding-left: ${(props: { indent: number }) =>
    CalculateIndentLevel(props.indent)}px;
  background-color: ${(props: { type: NodeType }) =>
    GetAspectColor(props.type)};
`;

export default AspectChildBox;
