import { AspectObject, Connector } from "lib";

export const GetConnectorNode = (connector: Connector, nodes: AspectObject[]) => {
  return nodes.find((node) => node.connectors.find((conn) => conn.id === connector.id));
};
