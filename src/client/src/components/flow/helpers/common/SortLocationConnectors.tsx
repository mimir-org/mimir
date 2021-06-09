import { IsInputConnector, IsLocationTerminal } from ".";

const SortLocationConnectors = (connectors) => {
  const availableConnectors = [];

  connectors.forEach((conn) => {
    IsLocationTerminal(conn) &&
      IsInputConnector(conn) &&
      availableConnectors.push(conn);
  });
  return availableConnectors;
};

export default SortLocationConnectors;
