import { Node, Edge } from "../../models";
import red from "../../redux/store";

const SetIndentLevel = (node: Node, count: number): number => {
  const edge = red.store
    .getState()
    .projectState.project.edges.find((x) => x.toNode === node) as Edge;

  if (!edge) return count;
  else count++;

  const nextNode = red.store
    .getState()
    .projectState.project.nodes.find((node) => node === edge.fromNode) as Node;

  if (!nextNode) {
    return count;
  }

  return SetIndentLevel(nextNode, count);
};

export default SetIndentLevel;
