import { Connector } from "../../../models";
import { IsLocationTerminal, IsTransportTerminal } from "../helpers";

const ValidateConnector = (conn: Connector, isLocation: boolean) => {
  return (isLocation && IsLocationTerminal(conn)) || (!isLocation && IsTransportTerminal(conn));
};

export default ValidateConnector;
