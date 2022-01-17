import { Connector, ConnectorVisibility } from "../models";

const IsConnectorVisible = (conn: Connector) => {
  return conn.connectorVisibility !== ConnectorVisibility.None;
};

export default IsConnectorVisible;
