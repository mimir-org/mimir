import { Elements } from "react-flow-renderer";
import { BuildBlockNode } from "../";
import { Node, Edge } from "../../../../../models";
import { IsPartOfTerminal } from "../../../helpers";
import { IsOffPage } from "../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param allNodes
 * @param selectedNode
 * @param elements
 * @param parentNode
 */
const DrawChildNodes = (
  edges: Edge[],
  allNodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  parentNode: Node
) => {
  edges.forEach((edge) => {
    if (validateEdge(edge, selectedNode)) {
      const toNode = allNodes.find((n) => n.id === edge.toNode.id);
      if (toNode) elements.push(BuildBlockNode(toNode, null, allNodes, parentNode));
    }
  });
};

function validateEdge(edge: Edge, selectedNode: Node) {
  return (
    edge.fromNodeId === selectedNode?.id &&
    (selectedNode?.aspect === edge.toNode.aspect || IsOffPage(edge.toNode)) &&
    IsPartOfTerminal(edge.toConnector)
  );
}

export default DrawChildNodes;
