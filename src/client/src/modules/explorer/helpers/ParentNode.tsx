import red from "../../../redux/store";
import { Node, Edge } from "../../../models";
import { IsPartOfTerminal } from "../../../components/flow/helpers";

const FindParentEdge = (node: Node): Edge => {
  return red.store
    .getState()
    .projectState.project.edges.find((x) => x.toNodeId === node.id && IsPartOfTerminal(x.fromConnector)) as Edge;
};

const FindChildrenEdge = (node: Node): Edge => {
  return red.store
    .getState()
    .projectState.project.edges.find((x) => x.fromNodeId === node.id && IsPartOfTerminal(x.fromConnector)) as Edge;
};

const HasChildren = (_node: Node) => {
  return !!FindChildrenEdge(_node);
};

const IsAncestorInSet = (elem: Node, set: Set<string>): boolean => {
  const edge = FindParentEdge(elem);

  if (!edge) return false;

  const parentNode = edge.fromNode;
  if (set.has(parentNode.id)) return true;

  return IsAncestorInSet(parentNode, set);
};

export { FindParentEdge, FindChildrenEdge, HasChildren, IsAncestorInSet };
