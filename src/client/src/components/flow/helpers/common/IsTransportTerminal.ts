import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RELATION_TYPE.Transport;
};

export default IsTransportTerminal;
