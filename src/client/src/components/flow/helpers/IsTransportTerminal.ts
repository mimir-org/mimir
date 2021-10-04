import { Connector } from "../../../models";

const IsTransportTerminal = (conn: Connector) => {
  return conn?.terminalCategoryId !== undefined;
};

export default IsTransportTerminal;
