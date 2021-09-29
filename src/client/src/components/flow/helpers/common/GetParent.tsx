import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../../models";

/**
 * Function to find a node's parentNode
 * @param node - the child node
 * @param nodes - allnodes
 * @param edges  - all edges
 * @returns the parentNode
 */
const GetParent = (node: Node, nodes: Node[], edges: Edge[]) => {
  const parentEdge = edges.find(
    (e) => e.toNodeId === node.id && IsPartOfTerminal(e.toConnector)
  );

  const parentNode = nodes.find((n) => n.id === parentEdge?.fromNodeId);

  return parentNode ?? node;
};

export default GetParent;
