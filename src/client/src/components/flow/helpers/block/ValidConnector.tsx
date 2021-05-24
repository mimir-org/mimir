import { Connector, RELATION_TYPE } from "../../../../models/project";

const ValidConnector = (conn: Connector, isLocation: boolean): boolean => {
  return (
    (isLocation && conn.relationType === RELATION_TYPE.HasLocation) ||
    (!isLocation && conn.relationType === RELATION_TYPE.Transport)
  );
};

export default ValidConnector;
