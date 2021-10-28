import { ConnectorType } from "../../../../../models";

export const formatTerminalTypeName = (name: string, connectorType: ConnectorType) =>
  `${name} [${ConnectorType[connectorType].toLowerCase()}]`;
