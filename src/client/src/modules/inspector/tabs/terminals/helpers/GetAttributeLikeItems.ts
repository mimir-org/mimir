import { IsConnector } from "../../../helpers/IsType";
import { TerminalLikeItem } from "../../../types";

export const GetAttributeLikeItems = (terminal: TerminalLikeItem) => {
  if (IsConnector) return undefined;

  return terminal.attributes;
};
