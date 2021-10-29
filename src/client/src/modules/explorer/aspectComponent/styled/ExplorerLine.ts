import styled from "styled-components";
import { GetExplorerColor } from "../../helpers";
import { Node } from "../../../../models";

interface Props {
  isRoot: boolean;
  node: Node;
}

const ExplorerLine = styled.div<Props>`
  opacity: ${(props) => (props.isRoot ? 1 : 0)};
  height: 3px;
  background-color: ${(props) => GetExplorerColor(props.node)};
`;

export default ExplorerLine;
