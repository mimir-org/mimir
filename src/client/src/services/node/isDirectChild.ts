import { Edge, NodeType, ConnectorDirection, RelationType } from "@mimirorg/modelbuilder-types";
import { IsRelation } from "../typeService";

export const isDirectChildRecursive = (edge: Edge, parentNodeId: string, edges: Edge[]): boolean => {
  if (edge == null || edge.fromNode == null || edges == null) return false;
  if (edge.fromNode.nodeType !== NodeType.Handler && edge.fromNodeId === parentNodeId) return true;

  const inputConnector = edge.fromNode.connectors?.find(
    (c) => c.type === ConnectorDirection.Input && IsRelation(c) && c.relationType === RelationType.PartOf
  );
  if (inputConnector == null) return false;

  const nextEdge = edges?.find((e) => e.toConnectorId === inputConnector.id);
  return isDirectChildRecursive(nextEdge, parentNodeId, edges);
};
