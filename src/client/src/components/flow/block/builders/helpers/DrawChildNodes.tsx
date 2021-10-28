import { Elements } from "react-flow-renderer";
import { BuildBlockNode } from "../";
import { Node, Edge } from "../../../../../models";
import { IsFamily, IsPartOf } from "../../../helpers";
import { IsOffPage } from "../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param allNodes
 * @param selectedNode
 * @param elements
 * @param parentNode
 * @param parentNodeWidth
 */
const DrawChildNodes = (
  edges: Edge[],
  allNodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  parentNode: Node,
  parentNodeWidth: number
) => {
  edges.forEach((edge) => {
    if (validateEdge(edge, selectedNode)) {
      const toNode = allNodes.find((n) => n.id === edge.toNode.id);
      if (toNode) elements.push(BuildBlockNode(toNode, parentNode, parentNodeWidth));
    }
  });
};

function validateEdge(edge: Edge, selectedNode: Node) {
  return (
    edge.fromNodeId === selectedNode?.id &&
    (IsFamily(selectedNode, edge.toNode) || IsOffPage(edge.toNode)) &&
    IsPartOf(edge.toConnector)
  );
}

export default DrawChildNodes;
