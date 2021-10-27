import { Connector, RelationType } from "../../../models";

const IsPartOf = (conn: Connector) => {
  return conn?.relationType === RelationType.PartOf;
};

export default IsPartOf;
