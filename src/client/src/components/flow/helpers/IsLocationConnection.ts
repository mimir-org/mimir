import { Connector, RelationType } from "../../../models";

const IsLocationConnection = (source: Connector, target: Connector) => {
  return source?.relationType === RelationType.HasLocation && target?.relationType === RelationType.HasLocation;
};

export default IsLocationConnection;
