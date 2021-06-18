import { Connector, ConnectorType } from "../../../../models";

const GetConnectorName = (conn: Connector) => {
  const type = conn.type === ConnectorType.Input ? "Input" : "Output";

  return conn.name + " (" + type + ")";
};

export default GetConnectorName;
