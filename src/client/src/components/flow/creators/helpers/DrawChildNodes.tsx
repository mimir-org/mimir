import { Elements } from "react-flow-renderer";
import { CreateBlockNode } from "..";
import { Node, Edge } from "../../../../models";
import { IsPartOfTerminal } from "../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param nodes
 * @param selectedNode
 * @param elements
 */
const DrawChildNodes = (edges: Edge[], nodes: Node[], selectedNode: Node, elements: Elements<any>) => {
  edges.forEach((edge) => {
    if (
      edge.fromNodeId === selectedNode?.id &&
      selectedNode?.aspect === edge.toNode.aspect &&
      IsPartOfTerminal(edge.toConnector)
    ) {
      const toNode = nodes.find((node) => node.id === edge.toNodeId);
      if (toNode) elements.push(CreateBlockNode(toNode, null, nodes));
    }
  });
};

export default DrawChildNodes;
