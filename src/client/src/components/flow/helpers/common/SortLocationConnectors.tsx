import { IsLocationTerminal } from ".";
import { CONNECTOR_TYPE } from "../../../../models/project";

const SortLocationConnectors = (connectors) => {
  const availableConnectors = [];

  connectors.forEach((conn) => {
    IsLocationTerminal(conn) &&
      conn.type === CONNECTOR_TYPE.INPUT &&
      availableConnectors.push(conn);
  });
  return availableConnectors;
};

export default SortLocationConnectors;
