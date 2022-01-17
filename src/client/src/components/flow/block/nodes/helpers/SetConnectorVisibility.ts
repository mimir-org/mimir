import { IsConnectorVisible } from "../../../../../helpers";
import { Connector, ConnectorVisibility } from "../../../../../models";

const SetConnectorVisibility = (conn: Connector, isInput: boolean) => {
  const visible = IsConnectorVisible(conn);

  if (visible) return ConnectorVisibility.None;
  if (isInput) return ConnectorVisibility.InputVisible;
  else return ConnectorVisibility.OutputVisible;
};
export default SetConnectorVisibility;
