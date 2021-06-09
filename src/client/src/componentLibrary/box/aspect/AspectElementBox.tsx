import styled from "styled-components";
import { UseIndentLevel, GetAspectColor } from "../../../assets/helpers";
import { Node } from "../../../models/project";

const AspectElementBox = styled.div`
  padding-bottom: 9px;
  padding-left: ${(props: { indent: number }) =>
    UseIndentLevel(props.indent)}px;
  background-color: ${(props: { node: Node }) =>
    GetAspectColor(props.node, true)};
`;

export default AspectElementBox;
