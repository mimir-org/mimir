/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { TerminalCategory } from "../../../../../../../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { TerminalLikeItem } from "../../../../../../../../types";

export const FilterTerminalCategories = (terminalCategories: any[], terminals: TerminalLikeItem[]) => {
  return terminalCategories;
};

// terminalCategories
//   .filter((cat) => terminals.find((term) => term.terminalCategory === cat.id))
//   .map((cat) => ({
//     ...cat,
//     items: cat.items.filter((terminalType) => terminals.find((terminal) => terminal.terminalTypeId === terminalType.id)),
//   }));

// TODO: fix
