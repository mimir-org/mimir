import { Connector, ConnectorType } from "../../../models";

const IsInputTerminal = (terminal: Connector) => {
  return terminal?.type === ConnectorType.Input;
};

export default IsInputTerminal;
