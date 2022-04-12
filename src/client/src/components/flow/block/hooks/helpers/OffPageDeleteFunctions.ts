import { IsOffPage } from "../../../../../helpers/Aspects";
import { Node, Edge, Project } from "../../../../../models";
import { IsPartOfTerminal, IsTransport } from "../../../helpers/Connectors";
import { IsOffPageEdge } from "../../helpers/IsOffPageEdge";

export function GetTransportEdge(nodeId: string, parentNodeId: string, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNodeId && IsTransport(x?.fromConnector) && x.toConnector?.nodeId === nodeId) ||
      (x.toConnector?.nodeId === parentNodeId && IsTransport(x?.toConnector) && x.fromConnector?.nodeId === nodeId)
  );
}
export function GetOppositeTransportEdge(project: Project, edge: Edge) {
  return project.edges.find(
    (e) => IsOffPageEdge(e) && (e.fromConnectorId === edge.fromConnectorId || e.toConnectorId === edge.toConnectorId)
  );
}

export function GetRelatedTransportEdge(nodeId: string, elementEdge: Edge, project: Project) {
  return project.edges.find(
    (e) =>
      (e.fromNodeId === nodeId || e.toNodeId == nodeId) &&
      (e.fromConnectorId === elementEdge.fromConnectorId || e.toConnectorId === elementEdge.toConnectorId)
  );
}

export function GetPartOfEdge(nodeId: string, parentNodeId: string, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNodeId && IsPartOfTerminal(x?.fromConnector) && x.toConnector?.nodeId === nodeId) ||
      (x.toConnector?.nodeId === parentNodeId && IsPartOfTerminal(x?.toConnector) && x.fromConnector?.nodeId === nodeId)
  );
}

export function GetRelatedPartOfEdge(node: Node, project: Project) {
  const partOfTerminal = node.connectors?.find((c) => IsPartOfTerminal(c));
  return project.edges.find((x) => IsOffPage(x.toNode) && x.toNodeId === node.id && x.toConnectorId === partOfTerminal?.id);
}

export function GetConnectedEdge(connectorId: string, project: Project) {
  return project.edges.find(
    (edge) =>
      (edge.fromConnectorId === connectorId && !IsOffPage(edge.toNode)) ||
      (edge.toConnectorId === connectorId && !IsOffPage(edge.fromNode))
  );
}

export function GetParentConnector(transportEdge: Edge, nodeId: string) {
  return transportEdge?.fromConnector?.nodeId === nodeId ? transportEdge?.toConnector : transportEdge?.fromConnector;
}
