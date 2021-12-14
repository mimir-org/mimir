import { Elements } from "react-flow-renderer";
import { BuildChildNode } from "..";
import { IsFamily, IsOffPage } from "../../../../../helpers";
import { Node, Edge } from "../../../../../models";
import { GetParent, IsPartOf } from "../../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param allNodes
 * @param selectedNode
 * @param elements
 * @param libOpen
 * @param explorerOpen
 * @param secondaryNode
 */
const DrawChildNodes = (
  edges: Edge[],
  allNodes: Node[],
  selectedNode: Node,
  elements: Elements<any>,
  libOpen: boolean,
  explorerOpen: boolean,
  secondaryNode: Node
) => {
  edges.forEach((edge) => {
    if (ValidateEdge(edge, selectedNode)) {
      const toNode = allNodes.find((n) => n.id === edge.toNode.id);
      if (IsOffPage(toNode)) {
        const isValidOffPage = ValidateOffPageNode(toNode, elements);
        if (toNode && isValidOffPage) elements.push(BuildChildNode(toNode, libOpen, explorerOpen, secondaryNode, edges));
      } else {
        if (toNode) elements.push(BuildChildNode(toNode, libOpen, explorerOpen, secondaryNode, edges));
      }
    }
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOf(edge.toConnector);

  return (
    edge.fromNodeId === selectedNode?.id &&
    (IsFamily(selectedNode, edge.toNode) || IsOffPage(edge.toNode)) &&
    IsPartOf(edge.toConnector)
  );
}

export function ValidateOffPageNode(node: Node, elements: Elements<any>) {
  const offPageParent = GetParent(node);

  return elements.some((elem) => elem.id === offPageParent.id);
}

export default DrawChildNodes;
