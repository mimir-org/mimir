import styled from "styled-components";
import { UseIndentLevel, GetAspectColor } from "../../../assets/helpers";
import { Node } from "../../../models";

const AspectElementBox = styled.div`
  display: flex;
  padding-bottom: 5px;
  padding-right: 5px;
  padding-left: ${(props: { indent: number }) =>
    UseIndentLevel(props.indent)}px;
  background-color: ${(props: { node: Node }) =>
    GetAspectColor(props.node, true)};

  .checkbox_container {
    flex: 2;
    margin-top: 5px;
    padding-left: 5px;
  }
  .expandIcon {
    cursor: pointer;
  }
`;

export default AspectElementBox;
