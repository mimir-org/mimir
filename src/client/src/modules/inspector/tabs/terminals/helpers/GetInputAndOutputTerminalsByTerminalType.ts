import { IsInputTerminal } from "../../../../../components/flow/helpers";
import { TerminalLikeItem } from "../../../types";

export const GetInputAndOutputTerminalsByTerminalType = (terminals: TerminalLikeItem[]) => {
  let inputTerminalsByCategory = new Map<string, TerminalLikeItem[]>();
  let outputTerminalsByCategory = new Map<string, TerminalLikeItem[]>();

  for (let terminal of terminals) {
    if (IsInputTerminal(terminal)) InsertMapWithDefault(terminal.terminalTypeId, terminal, inputTerminalsByCategory);
    else InsertMapWithDefault(terminal.terminalTypeId, terminal, outputTerminalsByCategory);
  }

  return [inputTerminalsByCategory, outputTerminalsByCategory];
};

const InsertMapWithDefault = (key: string, value: TerminalLikeItem, map: Map<string, TerminalLikeItem[]>) => {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
};
