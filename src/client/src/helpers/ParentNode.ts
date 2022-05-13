import { Node, Edge } from "../models";
import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";

export const FindParentEdge = (nodeId: string, edges: Edge[]) => {
  return edges.find((x) => x.toNodeId === nodeId && IsPartOfTerminal(x.fromConnector));
};

const FindChildrenEdge = (nodeId: string, edges: Edge[]) => {
  return edges.find((x) => x.fromNodeId === nodeId && IsPartOfTerminal(x.fromConnector));
};

export const HasChildren = (_nodeId: string, edges: Edge[]) => {
  return !!FindChildrenEdge(_nodeId, edges);
};

export const IsAncestorInSet = (elem: Node, set: Set<string>, edges: Edge[]): boolean => {
  const edge = FindParentEdge(elem?.id, edges);

  if (!edge) return false;

  const parentNode = edge.fromNode;
  if (set.has(parentNode.id)) return true;

  return IsAncestorInSet(parentNode, set, edges);
};
