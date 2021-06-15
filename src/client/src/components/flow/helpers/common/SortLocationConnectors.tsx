import { IsInputConnector, IsLocationTerminal } from ".";

const SortLocationConnectors = (connectors) => {
  const connectorList = [];

  connectors.forEach((conn) => {
    IsLocationTerminal(conn) &&
      IsInputConnector(conn) &&
      connectorList.push(conn);
  });
  return connectorList;
};

export default SortLocationConnectors;
