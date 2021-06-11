import { Connector, RELATION_TYPE } from "../../../../models/project";

const IsPartOfTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RELATION_TYPE.PartOf;
};

export default IsPartOfTerminal;
