import { IsInputTerminal } from "../../../../../../../../../../components/flow/helpers/Connectors";
import { TerminalLikeItem } from "../../../../../../../../types";

export const GetInputAndOutputTerminalsByTerminalType = (terminals: TerminalLikeItem[]) => {
  const inputTerminalsByCategory = new Map<string, TerminalLikeItem[]>();
  const outputTerminalsByCategory = new Map<string, TerminalLikeItem[]>();

  for (const terminal of terminals) {
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
