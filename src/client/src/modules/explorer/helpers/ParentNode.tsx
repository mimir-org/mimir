import { Node, Edge, Project } from "../../../models";
import { IsPartOfTerminal } from "../../../components/flow/helpers";

const FindParentEdge = (node: Node, project: Project): Edge => {
  return project.edges.find((x) => x.toNodeId === node.id && IsPartOfTerminal(x.fromConnector));
};

const FindChildrenEdge = (node: Node, project: Project): Edge => {
  return project.edges.find((x) => x.fromNodeId === node.id && IsPartOfTerminal(x.fromConnector));
};

const HasChildren = (_node: Node, project: Project) => {
  return !!FindChildrenEdge(_node, project);
};

const IsAncestorInSet = (elem: Node, set: Set<string>, project: Project): boolean => {
  const edge = FindParentEdge(elem, project);

  if (!edge) return false;

  const parentNode = edge.fromNode;
  if (set.has(parentNode.id)) return true;

  return IsAncestorInSet(parentNode, set, project);
};

export { FindParentEdge, FindChildrenEdge, HasChildren, IsAncestorInSet };
