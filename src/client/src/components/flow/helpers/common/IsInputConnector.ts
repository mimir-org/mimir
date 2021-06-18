import { Connector, ConnectorType } from "../../../../models";

const IsInputConnector = (conn: Connector) => {
    return conn?.type === ConnectorType.Input;
};

export default IsInputConnector;
