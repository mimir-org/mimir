import { AspectObject } from "lib";

export const GetConnector = (nodeId: string, connectorId: string, nodes: AspectObject[]) => {
  const node = nodes.find((n) => n.id === nodeId);
  return node.connectors.find((conn) => conn.id === connectorId || conn.inside === connectorId || conn.outside === connectorId);
};
