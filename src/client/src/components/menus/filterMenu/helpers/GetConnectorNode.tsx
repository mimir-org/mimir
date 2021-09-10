import red from "../../../../redux/store";
import { Connector, Node } from "../../../../models";

const GetConnectorNode = (connector: Connector) => {
  const nodes = red.store.getState().projectState?.project.nodes;

  return nodes.find((node) =>
    node.connectors.find((conn) => conn.id === connector.id)
  ) as Node;
};

export default GetConnectorNode;
