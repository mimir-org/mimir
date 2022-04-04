import red from "../redux/store";
import { Node } from "../models";
import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";

/**
 * Recursive function to give each node the correct level  based on it's family tree.
 * @param node
 * @param count
 * @returns a number that defines the indent in the Explorer Module.
 */
export const SetIndentLevel = (node: Node, count: number): number => {
  const edges = red.store.getState().projectState.project.edges;
  const nodes = red.store.getState().projectState.project.nodes;

  const edge = edges.find((x) => x.toNode.id === node.id && IsPartOfTerminal(x.toConnector));
  if (!edge) return count;

  count++;

  const nextNode = nodes?.find((x) => x.id === edge.fromNode?.id);
  if (!nextNode) return count;

  return SetIndentLevel(nextNode, count);
};
