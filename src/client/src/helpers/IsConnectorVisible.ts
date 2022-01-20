import { Connector, ConnectorVisibility } from "../models";

const IsConnectorVisible = (conn: Connector) => {
  return (
    conn.connectorVisibility === ConnectorVisibility.InputVisible ||
    conn.connectorVisibility === ConnectorVisibility.OutputVisible
  );
};

export default IsConnectorVisible;
