import { IsConnectorVisible } from "../../../../../helpers";
import { Connector } from "../../../../../models";
import { IsBidirectionalTerminal, IsInputVisible, IsOutputVisible, IsPartOf } from "../../../helpers";

/**
 * Component to determine if a handle/connector should be displayed in BlockView.
 * @param conn
 * @param isInput
 * @returns a boolean value.
 */
const ShowHandle = (conn: Connector, isInput: boolean) => {
  if (IsPartOf(conn)) return false;

  if (IsBidirectionalTerminal(conn)) {
    if (isInput) return IsInputVisible(conn);
    else return IsOutputVisible(conn);
  }
  return IsConnectorVisible(conn);
};

export default ShowHandle;
