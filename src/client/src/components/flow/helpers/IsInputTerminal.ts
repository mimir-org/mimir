import { ConnectorType } from "../../../models";

import { TerminalLikeItem } from "../../../modules/inspector/types";

export const IsInputTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorType.Input;
};
