/* eslint-disable @typescript-eslint/no-explicit-any */
import { AspectObject, Connection, Connector, ConnectorTerminal } from "lib";
import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";

/**
 * Method to find all terminals of a Node.
 * @param flowNodes
 * @returns a list of all terminals used in the Visual Filter.
 */
export const GetAllTerminals = (flowNodes: FlowNode[]) => {
  const terminals: Connector[] = [];

  flowNodes?.forEach((flowNode) => {
    const node = flowNode.data as AspectObject;
    node.connectors?.forEach((c: Connector) => {
      if (c instanceof ConnectorTerminal) terminals.push(c);
    });
  });

  return terminals;
};

/**
 * Method to find a node's active terminals - terminals that have an edge.
 * @param flowEdges
 * @param nodes
 * @returns an object with two lists - one for edges and one for terminals.
 */
export const GetActiveTerminals = (flowEdges: FlowEdge[], nodes: AspectObject[]) => {
  const activeEdges: Connection[] = [];
  const activeTerminals: Connector[] = [];

  flowEdges?.forEach((elem) => {
    const edge = elem.data.edge as Connection;

    // const sourceNode = nodes.find((n) => n.id === edge.fromNodeId);
    // const targetNode = nodes.find((n) => n.id === edge.toNodeId);
    // const sourceConn = sourceNode?.connectors.find((c) => c.id === edge.fromConnector);
    // const targetConn = targetNode?.connectors.find((c) => c.id === edge.toConnector);

    // activeEdges.push(edge);
    // activeTerminals.push(sourceConn);
    // activeTerminals.push(targetConn);
  });

  return { activeEdges, activeTerminals };
};

/**
 * Method to find a node's inactive terminals - terminals that are not connected to an Edge.
 * @param nodes
 * @returns a list of inactive terminals.
 */
export const GetInactiveTerminals = (nodes: AspectObject[]) => {
  const terminals = [];

  nodes.forEach((n) => {
    n.connectors?.forEach((c) => {
      if (c instanceof ConnectorTerminal) return;
      terminals.push(c);
    });
  });

  return terminals;
};
