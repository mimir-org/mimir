import { ConnectorDirection } from "@mimirorg/modelbuilder-types";

export const formatTerminalTypeName = (name: string, connectorType: ConnectorDirection) =>
  `${name} [${ConnectorDirection[connectorType].toLowerCase()}]`;
