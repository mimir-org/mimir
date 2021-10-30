import { Connector, RelationType } from "../../../models";

const IsProductConnection = (source: Connector, target: Connector) => {
  return source?.relationType === RelationType.FulfilledBy && target?.relationType === RelationType.FulfilledBy;
};

export default IsProductConnection;
