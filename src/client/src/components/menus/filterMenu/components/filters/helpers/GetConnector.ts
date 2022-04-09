import { Node } from "../../../../../../models";

export const GetConnector = (nodeId: string, connectorId: string, nodes: Node[]) => {
  const node = nodes.find((x) => x.id === nodeId);
  return node.connectors.find((conn) => conn.id === connectorId);
};
