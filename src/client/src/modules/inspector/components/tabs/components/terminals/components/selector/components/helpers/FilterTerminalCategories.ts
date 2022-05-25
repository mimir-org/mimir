import { TerminalCategory } from "../../../../../../../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { TerminalLikeItem } from "../../../../../../../../types";

export const FilterTerminalCategories = (terminalCategories: TerminalCategory[], terminals: TerminalLikeItem[]) =>
  terminalCategories
    .filter((cat) => terminals.find((term) => term.terminalCategory === cat.id))
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((terminalType) => terminals.find((terminal) => terminal.terminalTypeId === terminalType.id)),
    }));
