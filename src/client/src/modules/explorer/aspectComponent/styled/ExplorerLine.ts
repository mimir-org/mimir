import styled from "styled-components";
import { GetExplorerColor } from "../../helpers";
import { Node } from "../../../../models";

interface Props {
  isRoot: boolean;
  node: Node;
}

const ExplorerLine = styled.div<Props>`
  visibility: ${(props) => !props.isRoot && "hidden"};
  height: ${(props) => props.isRoot && 2}px;
  background-color: ${(props) => GetExplorerColor(props.node)};
`;

export default ExplorerLine;
