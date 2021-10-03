import { Connector, ConnectorType } from "../../../models";

const IsOutputTerminal = (terminal: Connector) => {
  return terminal?.type === ConnectorType.Output;
};

export default IsOutputTerminal;
