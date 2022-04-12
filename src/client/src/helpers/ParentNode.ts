import { Node, Project } from "../models";
import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";

export const FindParentEdge = (nodeId: string, project: Project) => {
  return project.edges.find((x) => x.toNodeId === nodeId && IsPartOfTerminal(x.fromConnector));
};

const FindChildrenEdge = (nodeId: string, project: Project) => {
  return project.edges.find((x) => x.fromNodeId === nodeId && IsPartOfTerminal(x.fromConnector));
};

export const HasChildren = (_nodeId: string, project: Project) => {
  return !!FindChildrenEdge(_nodeId, project);
};

export const IsAncestorInSet = (elem: Node, set: Set<string>, project: Project): boolean => {
  const edge = FindParentEdge(elem?.id, project);

  if (!edge) return false;

  const parentNode = edge.fromNode;
  if (set.has(parentNode.id)) return true;

  return IsAncestorInSet(parentNode, set, project);
};
