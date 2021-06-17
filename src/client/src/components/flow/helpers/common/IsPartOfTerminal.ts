import { Connector } from "../../../../models";

const IsPartOfTerminal = (conn: Connector): boolean => {
  return conn?.relationType === RELATION_TYPE.PartOf;
};

export default IsPartOfTerminal;
