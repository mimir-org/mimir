import { Edge, Node } from "../../../../../models";
import { IsPartOf } from "../../../helpers";

/**
 * Function to find children of a given Product Node in BlockView, and add them to the elements list.
 * @param edges
 * @param nodes
 * @param selectedNode
 * @param elements
 */
function TraverseProductNodes(edges: Edge[], nodes: Node[], selectedNode: Node, elements: Node[]) {
  const children: Node[] = [];

  edges.forEach((edge) => {
    if (edge.fromNodeId === selectedNode.id && IsPartOf(edge.fromConnector)) {
      const node = nodes.find((x) => x.id === edge.toNodeId);
      children.push(node);
      elements.push(node);
    }
  });

  // Base case
  if (children.length === 0) return;

  children.forEach((node) => {
    TraverseProductNodes(edges, nodes, node, elements);
  });
}

export default TraverseProductNodes;
