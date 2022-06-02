import { Edge } from "../../../models";

export const IsEdgeConnectedToNode = (edge: Edge, nodeId: string) => {
  return edge.fromNodeId === nodeId || edge.toNodeId === nodeId;
};
