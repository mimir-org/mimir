import { Connector, RelationType } from "../../../models";

export const IsPartOf = (conn: Connector) => {
  return conn?.relationType === RelationType.PartOf;
};
