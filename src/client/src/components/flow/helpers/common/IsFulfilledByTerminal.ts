import { Connector, RELATION_TYPE } from "../../../../models/project";

const IsFulfilledByTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RELATION_TYPE.FulfilledBy;
};

export default IsFulfilledByTerminal;
