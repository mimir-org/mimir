import { GetNumberOfTerminals } from ".";
import { TerminalLikeItem } from "../../../types";

export const GetNumTerminalsByCategory = (terminals: TerminalLikeItem[]): Map<string, number> => {
  const numterminalsByCategory = new Map();

  for (const terminal of terminals) {
    numterminalsByCategory.set(
      terminal.terminalCategoryId,
      (numterminalsByCategory.get(terminal.terminalCategoryId) ?? 0) + GetNumberOfTerminals(terminal)
    );
  }

  return numterminalsByCategory;
};
