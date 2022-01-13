import { IsPartOf } from ".";
import { Edge, Node } from "../../../models";

/**
 * Function to find a node's childNode
 * @param node - the parent node
 * @param nodes - allnodes
 * @param edges  - all edges
 * @returns the parentNode
 */

// TODO: this is used to traverse down one step in BlockView. How to find the correct child node will be defined later.
const GetChild = (node: Node, nodes: Node[], edges: Edge[]) => {
  const childEdge = edges.find((e) => e.fromNodeId === node.id && IsPartOf(e.toConnector));
  const childNode = nodes.find((n) => n.id === childEdge?.toNodeId);

  return childNode ?? node;
};

export default GetChild;
