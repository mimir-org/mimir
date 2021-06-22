import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector) => {
  return conn?.terminalCategoryId !== null;
};

export default IsTransportTerminal;
