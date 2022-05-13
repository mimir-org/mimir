import { Node, Connector } from "../../../../../../models";

export const GetConnectorNode = (connector: Connector, nodes: Node[]) => {
  return nodes.find((node) => node.connectors.find((conn) => conn.id === connector.id));
};
