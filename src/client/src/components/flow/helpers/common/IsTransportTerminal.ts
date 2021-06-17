import { Connector } from "../../../../models";

const IsTransportTerminal = (conn: Connector): boolean => {
  return true; //conn?.relationType === RELATION_TYPE.Transport; TODO:fix
};

export default IsTransportTerminal;
