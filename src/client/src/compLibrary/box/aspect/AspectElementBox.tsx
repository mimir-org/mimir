import styled from "styled-components";
import { UseIndentLevel, GetAspectColor } from "../../../assets/helpers";
import { Node } from "../../../models";

const AspectElementBox = styled.div`
  padding-bottom: 5px;
  padding-left: ${(props: { indent: number }) =>
    UseIndentLevel(props.indent)}px;
  background-color: ${(props: { node: Node }) =>
    GetAspectColor(props.node, true)};
`;

export default AspectElementBox;
