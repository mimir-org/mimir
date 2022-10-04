import { Edge, Node } from "@mimirorg/modelbuilder-types";
import { IsOffPage } from "../../../../helpers/Aspects";
import { IsPartOfRelation, IsTerminal } from "../../helpers/Connectors";
import { IsEdgeConnectedToNode } from "../../helpers/IsEdgeConnectedToNode";

export function GetTransportEdgeFromOffPageId(offPageNodeId: string, sourceNodeId: string, edges: Edge[]) {
  return edges.find(
    (e) =>
      (e.fromConnector.nodeId === sourceNodeId && IsTerminal(e.fromConnector) && e.toConnector.nodeId === offPageNodeId) ||
      (e.toConnector.nodeId === sourceNodeId && IsTerminal(e.toConnector) && e.fromConnector.nodeId === offPageNodeId)
  );
}

export function GetOffPageSourceTransportEdge(sourceConnectorId: string, edges: Edge[]) {
  return edges.find((e) => e.toConnectorId === sourceConnectorId && IsOffPage(e.fromNode));
}

export function GetOffPageTargetTransportEdge(sourceConnectorId: string, edges: Edge[]) {
  return edges.find((e) => e.fromConnectorId === sourceConnectorId && IsOffPage(e.toNode));
}

export function GetOffPagePartOfEdge(offPageNodeId: string, parentNodeId: string, edges: Edge[]) {
  return edges.find(
    (e) =>
      (e.fromConnector.nodeId === parentNodeId && IsPartOfRelation(e.fromConnector) && e.toConnector.nodeId === offPageNodeId) ||
      (e.toConnector.nodeId === parentNodeId && IsPartOfRelation(e.toConnector) && e.fromConnector.nodeId === offPageNodeId)
  );
}

export function GetCounterTransportEdge(edges: Edge[], mainEdge: Edge, offPageEdge: Edge) {
  return edges.find(
    (e) =>
      (IsOffPage(e.fromNode) && e.id !== offPageEdge.id && e.toConnectorId === mainEdge.toConnectorId) ||
      (IsOffPage(e.toNode) && e.id !== offPageEdge.id && e.fromConnectorId === mainEdge.fromConnectorId)
  );
}

export function GetCounterOffPageNode(nodes: Node[], counterTransportEdge: Edge) {
  const refNodeId = IsOffPage(counterTransportEdge?.toNode) ? counterTransportEdge?.toNodeId : counterTransportEdge?.fromNodeId;
  return nodes.find((n) => n.id === refNodeId);
}

export function GetRelatedTransportEdge(nodeId: string, edge: Edge, edges: Edge[]) {
  return edges.find(
    (e) =>
      (IsEdgeConnectedToNode(e, nodeId) && e.fromConnectorId === edge.fromConnectorId) || e.toConnectorId === edge.toConnectorId
  );
}

export function GetRelatedPartOfEdge(node: Node, edges: Edge[]) {
  const partOfTerminal = node.connectors.find((c) => IsPartOfRelation(c));
  if (!partOfTerminal) return null;
  return edges.find((e) => IsOffPage(e.toNode) && e.toNodeId === node.id && e.toConnectorId === partOfTerminal.id);
}

export function GetConnectedEdge(connId: string, edges: Edge[]) {
  return edges.find(
    (e) => (!IsOffPage(e.toNode) && e.fromConnectorId === connId) || (!IsOffPage(e.fromNode) && e.toConnectorId === connId)
  );
}

export function GetParentConnectorId(transportEdge: Edge, nodeId: string) {
  return transportEdge.fromConnector.nodeId === nodeId ? transportEdge.toConnectorId : transportEdge.fromConnectorId;
}
