import styled from "styled-components";
import { AspectColorType, Node } from "../../../../models";
import { GetAspectColor } from "../../../../helpers";

interface Props {
  node: Node;
  width: number;
}

const ExplorerAspectLine = styled.div<Props>`
  visibility: ${(props) => !props.node.isRoot && "hidden"};
  height: ${(props) => props.node.isRoot && 2}px;
  background-color: ${(props) => GetAspectColor(props.node, AspectColorType.Selected)};
  width: ${(props) => props.width}px;
`;

export default ExplorerAspectLine;
