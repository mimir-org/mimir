import { IsPartOfTerminal } from "../../common";
import { Edge, Node } from "../../../../../models";

/**
 * Function to find a nodes' children
 * @param parentNode
 * @param nodes
 * @param edges
 * @returns an array of children nodes
 */
const GetConnectChildren = (
  parentNode: Node,
  nodes: Node[],
  edges: Edge[]
): Node[] => {
  let children: Node[] = [];

  edges.forEach((edge) => {
    if (
      edge.fromNodeId === parentNode.id &&
      edge.toNode?.aspect === parentNode?.aspect &&
      IsPartOfTerminal(edge.toConnector)
    ) {
      const toNode = nodes.find((node) => node.id === edge.toNodeId);
      children.push(toNode);
    }
  });
  return children;
};

export default GetConnectChildren;
