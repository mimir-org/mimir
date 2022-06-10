import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../components/flow/helpers/Connectors";

export const FindParentEdge = (nodeId: string, edges: Edge[]) => {
  return edges.find((e) => e.toNodeId === nodeId && IsPartOfRelation(e.fromConnector));
};

const FindChildrenEdge = (nodeId: string, edges: Edge[]) => {
  return edges.find((e) => e.fromNodeId === nodeId && IsPartOfRelation(e.fromConnector));
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
