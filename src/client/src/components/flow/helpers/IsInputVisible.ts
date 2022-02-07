import { Connector, ConnectorVisibility } from "../../../models";

export const IsInputVisible = (connector: Connector) => {
  return connector.connectorVisibility === ConnectorVisibility.InputVisible;
};
