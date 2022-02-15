import { Edge, Node, Project } from "../models";
import { IsPartOf } from "../components/flow/helpers";

export const FindParentEdge = (node: Node, project: Project): Edge => {
  return project.edges.find((x) => x.toNodeId === node.id && IsPartOf(x.fromConnector));
};

const FindChildrenEdge = (node: Node, project: Project): Edge => {
  return project.edges.find((x) => x.fromNodeId === node.id && IsPartOf(x.fromConnector));
};

export const HasChildren = (_node: Node, project: Project) => {
  return !!FindChildrenEdge(_node, project);
};

export const IsAncestorInSet = (elem: Node, set: Set<string>, project: Project): boolean => {
  const edge = FindParentEdge(elem, project);

  if (!edge) return false;

  const parentNode = edge.fromNode;
  if (set.has(parentNode.id)) return true;

  return IsAncestorInSet(parentNode, set, project);
};
