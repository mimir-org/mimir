import { Connector, ConnectorType } from "../../../models";
import { IsConnector } from "../../../modules/inspector/helpers/IsType";
import { TerminalLikeItem } from "../../../modules/inspector/types";

export const IsInputTerminal = (terminal: Connector) => {
  return terminal?.type === ConnectorType.Input;
};

export const IsInputTerminalLikeItem = (terminalLikeItem: TerminalLikeItem) => {
  if (IsConnector(terminalLikeItem)) return IsInputTerminal(terminalLikeItem);
  else return terminalLikeItem.connectorType === ConnectorType.Input;
};
