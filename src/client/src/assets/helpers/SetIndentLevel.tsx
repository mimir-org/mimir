import { Node, Edge, Project } from "../../models";

const SetIndentLevel = (
  node: Node,
  count: number,
  project: Project
): number => {
  const edge = project.edges.find((x: Edge) => x.toNode === node);

  if (!edge) return count;
  else count++;

  const nextNode = project.nodes.find((x: Node) => x === edge.fromNode);

  if (!nextNode) {
    return count;
  }

  return SetIndentLevel(nextNode, count, project);
};

export default SetIndentLevel;
