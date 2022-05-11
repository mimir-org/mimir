import { IsOffPage } from "../../../../helpers/Aspects";
import { Edge, Node } from "../../../../models";

import { IsPartOfTerminal, IsTransport } from "../../helpers/Connectors";
import { IsEdgeConnectedToNode } from "../../helpers/IsEdgeConnectedToNode";

export function GetOffPageEdge(nodeId: string, parentNodeId: string, edges: Edge[]) {
  return edges.find(
    (e) =>
      (e.fromConnector.nodeId === parentNodeId && IsTransport(e.fromConnector) && e.toConnector.nodeId === nodeId) ||
      (e.toConnector.nodeId === parentNodeId && IsTransport(e.toConnector) && e.fromConnector.nodeId === nodeId)
  );
}

export function GetOppositeOffPageEdge(edges: Edge[], mainEdge: Edge, offPageEdge: Edge) {
  return edges.find(
    (e) =>
      (IsOffPage(e.fromNode) && e.id !== offPageEdge.id && e.toConnectorId === mainEdge.toConnectorId) ||
      (IsOffPage(e.toNode) && e.id !== offPageEdge.id && e.fromConnectorId === mainEdge.fromConnectorId)
  );
}

export function GetRelatedTransportEdge(nodeId: string, edge: Edge, edges: Edge[]) {
  return edges.find(
    (e) =>
      (IsEdgeConnectedToNode(e, nodeId) && e.fromConnectorId === edge.fromConnectorId) || e.toConnectorId === edge.toConnectorId
  );
}

export function GetPartOfEdge(nodeId: string, parentNodeId: string, edges: Edge[]) {
  return edges.find(
    (e) =>
      (e.fromConnector.nodeId === parentNodeId && IsPartOfTerminal(e.fromConnector) && e.toConnector.nodeId === nodeId) ||
      (e.toConnector.nodeId === parentNodeId && IsPartOfTerminal(e.toConnector) && e.fromConnector.nodeId === nodeId)
  );
}

export function GetRelatedPartOfEdge(node: Node, edges: Edge[]) {
  const partOfTerminal = node.connectors.find((c) => IsPartOfTerminal(c));
  if (!partOfTerminal) return null;
  return edges.find((e) => IsOffPage(e.toNode) && e.toNodeId === node.id && e.toConnectorId === partOfTerminal.id);
}

export function GetConnectedEdge(connectorId: string, edges: Edge[]) {
  return edges.find(
    (e) =>
      (e.fromConnectorId === connectorId && !IsOffPage(e.toNode)) || (e.toConnectorId === connectorId && !IsOffPage(e.fromNode))
  );
}

export function GetParentConnector(transportEdge: Edge, nodeId: string) {
  return transportEdge.fromConnector.nodeId === nodeId ? transportEdge.toConnector : transportEdge.fromConnector;
}
