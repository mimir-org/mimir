import styled from "styled-components";
import { Color } from "../..";
import { UseIndentLevel, GetAspectColor } from "../../../helpers";
import { AspectColorType, Node } from "../../../models";

interface Props {
  node: Node;
  indent: number;
}

const AspectBox = styled.div<Props>`
  display: flex;
  cursor: pointer;
  max-height: 30px;
  padding-left: ${(props) => (props.node.isRoot ? 5 : UseIndentLevel(props.indent))}px;
  background-color: ${(props) => (props.node.isRoot ? Color.LightGrey : GetAspectColor(props.node, AspectColorType.Main, true))};
  margin-top: ${(props) => props.node.isRoot && "7px"};

  &:hover {
    background-color: ${Color.LightBlue};
  }

  .expandIcon {
    position: relative;
    right: 10px;
  }

  .icon {
    position: relative;
    top: -1px;
    left: 10px;
    pointer-events: none;
  }

  .container {
    flex: 2;
    margin-left: ${(props) => props.node.isRoot && "18px"};
  }
`;

export default AspectBox;
