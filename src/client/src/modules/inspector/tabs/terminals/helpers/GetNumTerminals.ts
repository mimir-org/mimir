import { IsConnector } from "../../../helpers/IsType";
import { TerminalLikeItem } from "../../../types";

export const CountNumberOfTerminals = (terminals: TerminalLikeItem[]): number => {
  let count = 0;

  for (const terminal of terminals) {
    count += GetNumberOfTerminals(terminal);
  }

  return count;
};

export const GetNumberOfTerminals = (terminal: TerminalLikeItem) => (IsConnector(terminal) ? 1 : terminal.number);
