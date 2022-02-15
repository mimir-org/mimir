/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsConnectorVisible } from "../../../../../../helpers";
import { Connector, EDGE_KIND, Edge, Node } from "../../../../../../models";
import { EDGE_TYPE } from "../../../../../../models/project";
import { IsTransport } from "../../../../../flow/helpers";

/**
 * Method to find all terminals of a Node.
 * @param elements
 * @returns a list of all terminals.
 */
export const GetAllTerminals = (elements: any[]) => {
  const terminals: Connector[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (!isEdge) {
      const node = elem.data as Node;
      node.connectors?.forEach((c: Connector) => {
        if (IsTransport(c)) terminals.push(c);
      });
    }
  });

  return terminals;
};

/**
 * Method to find a node's active terminals - terminals that have an edge
 * @param elements
 * @param nodes
 * @returns a list of active terminals and edges
 */
export const GetActiveTerminals = (elements: any[], nodes: Node[]) => {
  const activeElements: any[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      const edge = elem.data.edge as Edge;

      const sourceNode = nodes.find((n) => n.id === edge.fromNodeId);
      const targetNode = nodes.find((n) => n.id === edge.toNodeId);
      const sourceConn = sourceNode?.connectors.find((c) => c.id === edge.fromConnectorId);
      const targetConn = targetNode?.connectors.find((c) => c.id === edge.toConnectorId);

      activeElements.push(edge);
      activeElements.push(sourceConn);
      activeElements.push(targetConn);
    }
  });
  return activeElements;
};

/**
 * Method to find a node's inactive terminals - terminals that are not connected to an Edge.
 * @param nodes
 * @returns a list of inactive terminals.
 */
export const GetInactiveTerminals = (nodes: Node[]) => {
  const terminals = [];

  nodes.forEach((n) => {
    n.connectors?.forEach((c) => {
      if (!IsConnectorVisible(c)) terminals.push(c);
    });
  });

  return terminals;
};
