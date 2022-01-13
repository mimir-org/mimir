import red from "../redux/store";
import { Edge, Node } from "../models";
import { IsPartOf } from "../components/flow/helpers";

const SetIndentLevel = (node: Node, count: number): number => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const nodes = red.store.getState().projectState.project.nodes as Node[];

  const edge = edges.find((x) => x.toNode.id === node.id && IsPartOf(x.toConnector));
  if (!edge) return count;

  count++;

  const nextNode = nodes?.find((x) => x.id === edge.fromNode?.id);
  if (!nextNode) return count;

  return SetIndentLevel(nextNode, count);
};

export default SetIndentLevel;
