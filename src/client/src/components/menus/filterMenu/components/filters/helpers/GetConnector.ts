import { Node } from "@mimirorg/modelbuilder-types";

export const GetConnector = (nodeId: string, connectorId: string, nodes: Node[]) => {
  const node = nodes.find((n) => n.id === nodeId);
  return node.connectors.find((conn) => conn.id === connectorId);
};
