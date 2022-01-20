import { Connector, ConnectorType } from "../../../models";

export const IsOutputTerminal = (terminal: Connector) => {
  return terminal?.type === ConnectorType.Output;
};
