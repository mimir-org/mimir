import { Elements } from "react-flow-renderer";
import { BuildBlockNode } from "../";
import { IsFamily, IsOffPage } from "../../../../../helpers";
import { Node, Edge } from "../../../../../models";
import { BlockNodeSize } from "../../../../../models/project";
import { IsPartOf } from "../../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param allNodes
 * @param selectedNode
 * @param elements
 * @param parentNode
 * @param parentNodeSize
 */
const DrawChildNodes = (
  edges: Edge[],
  allNodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  parentNode: Node,
  parentNodeSize: BlockNodeSize
) => {
  edges.forEach((edge) => {
    if (validateEdge(edge, selectedNode)) {
      const toNode = allNodes.find((n) => n.id === edge.toNode.id);
      if (toNode) elements.push(BuildBlockNode(toNode, parentNode, parentNodeSize));
    }
  });
};

function validateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsOffPage(edge.toNode) && IsPartOf(edge.toConnector);

  return (
    edge.fromNodeId === selectedNode?.id &&
    (IsFamily(selectedNode, edge.toNode) || IsOffPage(edge.toNode)) &&
    IsPartOf(edge.toConnector)
  );
}

export default DrawChildNodes;
