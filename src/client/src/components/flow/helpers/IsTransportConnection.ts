import { Connector } from "../../../models";

const IsTransportConnection = (source: Connector, target: Connector) => {
  return source?.terminalCategoryId !== undefined && target?.terminalCategoryId !== undefined;
};

export default IsTransportConnection;
