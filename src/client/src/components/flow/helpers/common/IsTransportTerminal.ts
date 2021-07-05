import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector): boolean => {
  return conn.terminalCategoryId !== undefined;
};

export default IsTransportTerminal;
