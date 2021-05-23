import { CONNECTOR_TYPE, RELATION_TYPE } from "../../../models/project";

const SortLocationConnectors = (connectors) => {
  const availableConnectors = [];

  connectors.forEach((conn) => {
    conn.relationType === RELATION_TYPE.HasLocation &&
      conn.type === CONNECTOR_TYPE.INPUT &&
      availableConnectors.push(conn);
  });
  return availableConnectors;
};

export default SortLocationConnectors;
