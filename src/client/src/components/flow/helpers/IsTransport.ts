import { Connector } from "../../../models";

const IsTransport = (conn: Connector) => {
  return conn?.terminalCategoryId !== undefined;
};

export default IsTransport;
