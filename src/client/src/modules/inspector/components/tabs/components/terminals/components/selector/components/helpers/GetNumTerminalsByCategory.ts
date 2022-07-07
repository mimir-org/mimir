/* eslint-disable @typescript-eslint/no-unused-vars */

import { TerminalLikeItem } from "../../../../../../../../types";

export const GetNumTerminalsByCategory = (terminals: TerminalLikeItem[]): Map<string, number> => {
  const numterminalsByCategory = new Map();

  // for (const terminal of terminals) {
  //   numterminalsByCategory.set(
  //     terminal.terminalCategory,
  //     (numterminalsByCategory.get(terminal.terminalCategory) ?? 0) + GetNumberOfTerminals(terminal)
  //   );
  // }

  return numterminalsByCategory;
};

// TODO: fix
