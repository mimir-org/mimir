import { Connector, RelationType } from "../../../../models";

const IsFulfilledByTerminal = (conn: Connector) => {
  return conn?.relationType === RelationType.FulfilledBy;
};

export default IsFulfilledByTerminal;
