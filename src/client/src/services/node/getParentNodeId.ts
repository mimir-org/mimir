import { Edge, NodeType, ConnectorDirection, RelationType } from "@mimirorg/modelbuilder-types";
import { IsRelation } from "../typeService";

export const getParentNodeIdRecursive = (edge: Edge, edges: Edge[]): string => {
  if (edge == null || edge.fromNode == null) return "";
  if (edge.fromNode.nodeType !== NodeType.Handler) return edge.fromNode.id;

  const inputConnector = edge.fromNode.connectors.find(
    (c) => c.type === ConnectorDirection.Input && IsRelation(c) && c.relationType === RelationType.PartOf
  );
  if (inputConnector == null) return "";

  const nextEdge = edges.find((e) => e.toConnectorId === inputConnector.id);
  return getParentNodeIdRecursive(nextEdge, edges);
};
