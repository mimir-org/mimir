import { Connector, RelationType } from "../../../models";

const IsProductTerminal = (conn: Connector) => {
  return conn?.relationType === RelationType.FulfilledBy;
};

export default IsProductTerminal;
