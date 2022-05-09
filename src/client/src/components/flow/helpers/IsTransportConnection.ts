import { Connector } from "../../../models";

const IsTransportConnection = (source: Connector, target: Connector) => {
  return source?.terminalCategory !== undefined && target?.terminalCategory !== undefined;
};

export default IsTransportConnection;
