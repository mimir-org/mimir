import { ConnectorType } from "../../../models";
import { TerminalLikeItem } from "../../../modules/inspector/types";

export const IsBidirectionalTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorType.Bidirectional;
};
