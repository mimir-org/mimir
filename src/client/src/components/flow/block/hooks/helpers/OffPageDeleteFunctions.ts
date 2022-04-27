import { IsOffPage } from "../../../../../helpers/Aspects";
import { Node, Edge } from "../../../../../models";
import { IsPartOfTerminal, IsTransport } from "../../../helpers/Connectors";
import { IsEdgeConnectedToNode } from "../../../helpers/IsEdgeConnectedToNode";
import { IsOffPageEdge } from "../../helpers/IsOffPageEdge";

export function GetTransportEdge(nodeId: string, parentNodeId: string, edges: Edge[]) {
  return edges.find(
    (e) =>
      (e.fromConnector.nodeId === parentNodeId && IsTransport(e.fromConnector) && e.toConnector.nodeId === nodeId) ||
      (e.toConnector.nodeId === parentNodeId && IsTransport(e.toConnector) && e.fromConnector.nodeId === nodeId)
  );
}

export function GetOppositeTransportEdge(edges: Edge[], edge: Edge) {
  return edges.find((e) => IsOffPageEdge(e) && IsEdgeConnected(e, edge));
}

export function GetRelatedTransportEdge(nodeId: string, elementEdge: Edge, edges: Edge[]) {
  return edges.find((e) => IsEdgeConnectedToNode(e, nodeId) && IsEdgeConnected(e, elementEdge));
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

function IsEdgeConnected(edge: Edge, secondEdge: Edge) {
  return edge.fromConnectorId === secondEdge.fromConnectorId || edge.toConnectorId === secondEdge.toConnectorId;
}
