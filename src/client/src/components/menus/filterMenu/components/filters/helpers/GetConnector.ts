import { Block } from "lib";

export const GetConnector = (nodeId: string, connectorId: string, nodes: Block[]) => {
  const node = nodes.find((n) => n.id === nodeId);
  return node.connectors.find((conn) => conn.id === connectorId || conn.inside === connectorId || conn.outside === connectorId);
};
