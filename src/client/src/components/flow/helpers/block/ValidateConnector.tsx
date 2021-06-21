import { Connector } from "../../../../models";
import { IsLocationTerminal, IsTransportTerminal } from "../common";

const ValidateConnector = (conn: Connector, isLocation: boolean) => {
  return (
    (isLocation && IsLocationTerminal(conn)) ||
    (!isLocation && IsTransportTerminal(conn))
  );
};

export default ValidateConnector;
