import styled from "styled-components";
import { AspectColorType, Node } from "../../../../models";
import { GetAspectColor } from "../../../../helpers";

interface Props {
  node: Node;
}

const ExplorerLine = styled.div<Props>`
  visibility: ${(props) => !props.node.isRoot && "hidden"};
  height: ${(props) => props.node.isRoot && 2}px;
  background-color: ${(props) => GetAspectColor(props.node, AspectColorType.Selected)};
`;

export default ExplorerLine;
