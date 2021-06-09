import { Connector } from "../../../../models/project";
import { IsLocationTerminal, IsTransportTerminal } from "../common";

const ValidateConnector = (conn: Connector, isLocation: boolean): boolean => {
  return (
    (isLocation && IsLocationTerminal(conn)) ||
    (!isLocation && IsTransportTerminal(conn))
  );
};

export default ValidateConnector;
