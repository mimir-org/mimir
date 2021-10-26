import { GetNumberOfTerminals } from ".";
import { TerminalLikeItem } from "../../../types";

export const GetNumTerminalsByCategory = (terminals: TerminalLikeItem[]): Map<string, number> => {
  let numterminalsByCategory = new Map();

  for (let terminal of terminals) {
    numterminalsByCategory.set(
      terminal.terminalCategoryId,
      (numterminalsByCategory.get(terminal.terminalCategoryId) ?? 0) + GetNumberOfTerminals(terminal)
    );

    console.log(terminal);
    console.log(GetNumberOfTerminals(terminal));
  }

  console.log(numterminalsByCategory);

  return numterminalsByCategory;
};
