import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector) => {
  return conn?.terminalCategoryId != null; // TODO: Check this
};

export default IsTransportTerminal;
