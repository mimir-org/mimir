import { Connector, RELATION_TYPE } from "../../../models/project";

const IsLocationTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RELATION_TYPE.HasLocation;
};

export default IsLocationTerminal;
