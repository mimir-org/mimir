import { Node, Project } from "../models";
import { IsPartOfTerminal } from "../components/flow/helpers/CheckConnectorTypes";

export const FindParentEdge = (node: Node, project: Project) => {
  return project.edges.find((x) => x.toNodeId === node.id && IsPartOfTerminal(x.fromConnector));
};

const FindChildrenEdge = (node: Node, project: Project) => {
  return project.edges.find((x) => x.fromNodeId === node.id && IsPartOfTerminal(x.fromConnector));
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
