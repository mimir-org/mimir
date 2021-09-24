import styled from "styled-components";
import { UseIndentLevel, GetAspectColor } from "../../../assets/helpers";
import { Node } from "../../../models";

const AspectBox = styled.div`
  display: flex;
  cursor: pointer;
  padding: 5px;
  padding-top: ${(props: { isRoot: boolean }) => (props.isRoot ? 5 : 0)}px;
  padding-left: ${(props: { indent: number; isRoot: boolean }) =>
    props.isRoot ? 5 : UseIndentLevel(props.indent)}px;

  background-color: ${(props: { node: Node }) =>
    GetAspectColor(props.node, true)};

  .icon {
    position: relative;
    top: 0.1px;
    left: 10px;
  }

  .checkbox_container {
    flex: 2;
    margin-top: 5px;
    padding-left: ${(props: { isRoot: boolean }) => (props.isRoot ? 22 : 5)}px;
  }
`;

export default AspectBox;
