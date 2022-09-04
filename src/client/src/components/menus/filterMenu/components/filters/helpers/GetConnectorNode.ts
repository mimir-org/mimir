import { Node, Connector } from "@mimirorg/modelbuilder-types";

export const GetConnectorNode = (connector: Connector, nodes: Node[]) => {
  return nodes.find((node) => node.connectors.find((conn) => conn.id === connector.id));
};
