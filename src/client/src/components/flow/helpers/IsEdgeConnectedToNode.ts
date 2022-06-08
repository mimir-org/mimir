import { Edge } from "@mimirorg/modelbuilder-types";

export const IsEdgeConnectedToNode = (edge: Edge, nodeId: string) => {
  return edge.fromNodeId === nodeId || edge.toNodeId === nodeId;
};
