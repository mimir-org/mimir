import { Connector, RelationType } from "../../../../models";

const IsFulfilledByTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RelationType.FulfilledBy;
};

export default IsFulfilledByTerminal;
