import { Connector } from "../../../../models";

const IsLocationTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RELATION_TYPE.HasLocation;
};

export default IsLocationTerminal;
