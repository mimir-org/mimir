import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../models";

/**
 * Function to find a node's parentNode
 * @param childNode - the child node
 * @param nodes - all nodes
 * @param edges  - all edges
 * @returns the parentNode
 */
const GetParent = (childNode: Node, nodes: Node[], edges: Edge[]) => {
  const parentEdge = edges.find((e) => e.toNodeId === childNode.id && IsPartOfTerminal(e.toConnector));
  const parentNode = nodes.find((n) => n.id === parentEdge?.fromNodeId);

  return parentNode ?? childNode;
};

export default GetParent;
