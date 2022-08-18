/* eslint-disable @typescript-eslint/no-explicit-any */
import { Terminal } from "@mimirorg/modelbuilder-types";

export const FilterTerminalCategories = (terminalCategories: any[], terminals: Terminal[]) => {
  return terminalCategories
    .filter((cat) => terminals.find((term) => term.terminalCategory === cat.id))
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((terminalType) => terminals.find((terminal) => terminal.terminalTypeId === terminalType.id)),
    }));
};
