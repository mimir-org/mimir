import red from "../redux/store";
import { Node } from "../models";
import { IsPartOfTerminal } from "../components/flow/helpers/CheckConnectorTypes";

const SetIndentLevel = (node: Node, count: number): number => {
  const edges = red.store.getState().projectState.project.edges;
  const nodes = red.store.getState().projectState.project.nodes;

  const edge = edges.find((x) => x.toNode.id === node.id && IsPartOfTerminal(x.toConnector));
  if (!edge) return count;

  count++;

  const nextNode = nodes?.find((x) => x.id === edge.fromNode?.id);
  if (!nextNode) return count;

  return SetIndentLevel(nextNode, count);
};

export default SetIndentLevel;
