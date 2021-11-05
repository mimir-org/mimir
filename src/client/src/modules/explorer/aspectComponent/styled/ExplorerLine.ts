import styled from "styled-components";
import { GetExplorerColor } from "../../helpers";
import { Node } from "../../../../models";

interface Props {
  node: Node;
}

const ExplorerLine = styled.div<Props>`
  visibility: ${(props) => !props.node.isRoot && "hidden"};
  height: ${(props) => props.node.isRoot && 2}px;
  background-color: ${(props) => GetExplorerColor(props.node)};
`;

export default ExplorerLine;
