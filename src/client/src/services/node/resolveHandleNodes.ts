import { Edge, ConnectorDirection, NodeType, Node } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../typeService";

export const resolveTerminalHandleFromNodes = (edge: Edge, edges: Edge[], nodes: Node[]): void => {
  if (edge == null || edges == null || edge.fromNode == null || edge.fromConnector == null) return;

  if (edge.fromNode.nodeType === NodeType.Handler) nodes.push(edge.fromNode);

  if (edge.toNode.nodeType !== NodeType.Handler) return;

  const fromConnector = edge.toNode.connectors.find((x) => IsTerminal(x) && x.type === ConnectorDirection.Output);
  if (fromConnector == null) return;

  const nextEdge = edges.find((e) => e.fromConnectorId === fromConnector.id);
  resolveTerminalHandleFromNodes(nextEdge, edges, nodes);
};

export const resolveTerminalHandleToNodes = (edge: Edge, edges: Edge[], nodes: Node[]): void => {
  if (edge == null || edges == null || edge.toNode == null || edge.toConnector == null) return;

  if (edge.toNode.nodeType === NodeType.Handler) nodes.push(edge.toNode);

  if (edge.fromNode.nodeType !== NodeType.Handler) return;

  const toConnector = edge.fromNode.connectors.find((x) => IsTerminal(x) && x.type === ConnectorDirection.Input);
  if (toConnector == null) return;

  const nextEdge = edges.find((e) => e.toConnectorId === toConnector.id);
  resolveTerminalHandleToNodes(nextEdge, edges, nodes);
};
