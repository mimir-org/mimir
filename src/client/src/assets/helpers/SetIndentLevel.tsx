import { Node, Edge } from "../../models";
import red from "../../redux/store";

const SetIndentLevel = (node: Node, count: number): number => {
  const edge = red.store
    .getState()
    .projectState.project.edges.find((x) => x.toNode === node.id) as Edge;

  if (!edge) return count;
  else count++;

  const nextNode = red.store
    .getState()
    .projectState.project.nodes.find((x) => x.id === edge.fromNode);

  if (!nextNode) {
    return count;
  }

  return SetIndentLevel(nextNode, count);
};

export default SetIndentLevel;
