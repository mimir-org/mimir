import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector): boolean => {
  Object.setPrototypeOf(conn, Connector.prototype);
  return conn.isTerminal();
};

export default IsTransportTerminal;
