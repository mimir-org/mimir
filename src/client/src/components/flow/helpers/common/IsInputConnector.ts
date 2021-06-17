import { Connector, ConnectorType } from "../../../../models";

const IsInputConnector = (conn: Connector): boolean => {
  return conn?.type === ConnectorType.Input;
};

export default IsInputConnector;
