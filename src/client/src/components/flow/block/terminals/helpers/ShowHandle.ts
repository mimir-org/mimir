import { IsConnectorVisible } from "../../../../../helpers";
import { Connector, ConnectorVisibility } from "../../../../../models";
import { IsBidirectionalTerminal } from "../../../helpers";

/**
 * Component to determine if a handle/connector should be displayed in BlockView.
 * @param conn
 * @param isInput
 * @returns a boolean value.
 */
const ShowHandle = (conn: Connector, isInput: boolean) => {
  if (IsBidirectionalTerminal(conn)) {
    if (isInput) return conn.connectorVisibility === ConnectorVisibility.InputVisible;
    else return conn.connectorVisibility === ConnectorVisibility.OutputVisible;
  }
  return IsConnectorVisible(conn);
};

export default ShowHandle;
