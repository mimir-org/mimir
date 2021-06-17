import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector): boolean => {
  return conn?.terminalCategoryId != null;
};

export default IsTransportTerminal;
