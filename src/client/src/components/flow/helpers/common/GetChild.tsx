import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../../models";

/**
 * Function to find a node's childNode
 * @param node - the parent node
 * @param nodes - allnodes
 * @param edges  - all edges
 * @returns the parentNode
 */
const GetChild = (node: Node, nodes: Node[], edges: Edge[]) => {
  const childEdge = edges.find((e) => e.fromNodeId === node.id && IsPartOfTerminal(e.toConnector));
  const childNode = nodes.find((n) => n.id === childEdge?.toNodeId);

  return childNode ?? node;
};

export default GetChild;
