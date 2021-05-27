import { Connector, RELATION_TYPE } from "../../../models/project";

const IsTransportTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RELATION_TYPE.Transport;
};

export default IsTransportTerminal;
