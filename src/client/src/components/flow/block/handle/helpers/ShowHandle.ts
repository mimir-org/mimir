import { IsConnectorVisible } from "../../../../../helpers";
import { Connector } from "../../../../../models";
import { IsBidirectionalTerminal, IsInputVisible, IsOutputVisible } from "../../../helpers/CheckConnectorTypes";

/**
 * Component to determine if a handle/connector should be displayed in BlockView.
 * @param conn
 * @param isInput
 * @returns a boolean value.
 */
const ShowHandle = (conn: Connector, isInput: boolean) => {
  if (IsBidirectionalTerminal(conn)) {
    if (isInput) return IsInputVisible(conn);
    return IsOutputVisible(conn);
  }

  return IsConnectorVisible(conn);
};

export default ShowHandle;
