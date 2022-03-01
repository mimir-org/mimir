import { Connector, RelationType } from "../../../models";

const IsPartOfConnection = (sourceConn: Connector, targetConn: Connector) => {
  return sourceConn?.relationType === RelationType.PartOf && targetConn?.relationType === RelationType.PartOf;
};

export default IsPartOfConnection;
