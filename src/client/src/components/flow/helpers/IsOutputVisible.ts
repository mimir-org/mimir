import { Connector, ConnectorVisibility } from "../../../models";

export const IsOutputVisible = (connector: Connector) => {
  return connector.connectorVisibility === ConnectorVisibility.OutputVisible;
};
