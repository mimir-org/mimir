import red from "../../../../redux/store";

const FindConnector = (nodeId: string, connectorId: string) => {
  const nodes = red.store.getState().projectState?.project.nodes;
  const node = nodes.find((x) => x.id === nodeId);

  return node.connectors.find((conn) => conn.id === connectorId);
};

export default FindConnector;
