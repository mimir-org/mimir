import styled from "styled-components";
import { Color } from "../..";
import { UseIndentLevel, GetAspectColor } from "../../../assets/helpers";
import { Node } from "../../../models";

interface Props {
  node: Node;
  isRoot: boolean;
  indent: number;
}

const AspectBox = styled.div<Props>`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin-top: ${(props) => (props.isRoot ? 12 : 0)}px;
  padding-left: ${(props) => (props.isRoot ? 5 : UseIndentLevel(props.indent))}px;
  background-color: ${(props) => (props.isRoot ? Color.LightGrey : GetAspectColor(props.node, true))};

  .expandIcon {
    position: relative;
    right: 10px;
  }

  .icon {
    position: relative;
    bottom: 1px;
    left: 10px;
  }

  .container {
    flex: 2;
    padding-top: 5px;
    margin-bottom: 9px;
    padding-left: ${(props) => (props.isRoot ? 22 : 5)}px;
  }
`;

export default AspectBox;
