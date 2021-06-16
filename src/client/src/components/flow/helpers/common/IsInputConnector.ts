import { Connector, CONNECTOR_TYPE } from "../../../../models/project";

const IsInputConnector = (conn: Connector): boolean => {
  return conn?.type === CONNECTOR_TYPE.INPUT;
};

export default IsInputConnector;
