import { Connector } from "../../../models";

const IsTransport = (conn: Connector) => {
  return conn?.terminalCategory !== undefined;
};

export default IsTransport;
