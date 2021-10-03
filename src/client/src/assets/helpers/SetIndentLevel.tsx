import red from "../../redux/store";
import { Node, Edge } from "../../models";
import { IsPartOfTerminal } from "../../components/flow/helpers";

const SetIndentLevel = (node: Node, count: number): number => {
  const edge = red.store
    .getState()
    .projectState.project.edges.find((x) => x.toNode.id === node.id && IsPartOfTerminal(x.toConnector)) as Edge;

  if (!edge) return count;

  count++;

  const nextNode = red.store.getState().projectState.project.nodes.find((x) => x.id === edge.fromNode.id) as Node;

  if (!nextNode) return count;

  return SetIndentLevel(nextNode, count);
};

export default SetIndentLevel;
