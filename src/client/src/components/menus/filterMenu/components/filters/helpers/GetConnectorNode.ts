import { Block, Connector } from "lib";

export const GetConnectorNode = (connector: Connector, nodes: Block[]) => {
  return nodes.find((node) =>
    node.connectors.find((conn) => conn.id === connector.id || conn.inside === connector.id || conn.outside === connector.id)
  );
};
