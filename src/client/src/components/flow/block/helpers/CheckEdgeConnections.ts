import { Edge, Node } from "../../../../models";

/**
 * Component to compare an edge from the Mimir project and an edge from the FlowElements list.
 * If a matching connector is found the component returns true.
 * @param mimirEdge
 * @param flowEdge
 * @returns a boolean value.
 */
export const DoConnectorsMatch = (mimirEdge: Edge, flowEdge: Edge) => {
  return mimirEdge?.fromConnectorId === flowEdge?.fromConnectorId || mimirEdge?.toConnectorId === flowEdge?.toConnectorId;
};

/**
 * Component to check if an Edge is connected to a Node.
 * @param edge
 * @param node
 * @returns a boolean value.
 */
export const EdgeIsConnectedToNode = (edge: Edge, node: Node) => {
  return node?.id === edge?.fromNodeId || node?.id === edge?.toNodeId;
};
