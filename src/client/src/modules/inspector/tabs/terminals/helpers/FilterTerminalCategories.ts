import { TerminalCategory } from "../../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { Connector } from "../../../../../models";

export const FilterTerminalCategories = (terminalCategories: TerminalCategory[], terminals: Connector[]) =>
  terminalCategories
    .filter((cat) => terminals.find((term) => term.terminalCategoryId === cat.id))
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((terminalType) =>
        terminals.find((terminal) => terminal.terminalTypeId === terminalType.id)
      ),
    }));
