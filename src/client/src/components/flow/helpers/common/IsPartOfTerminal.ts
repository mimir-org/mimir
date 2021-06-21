import { Connector, RelationType } from "../../../../models";

const IsPartOfTerminal = (conn: Connector) => {
  return conn?.relationType === RelationType.PartOf;
};

export default IsPartOfTerminal;
