import { IsInputTerminal } from "../../../../../components/flow/helpers";
import { Connector } from "../../../../../models";

export const GetInputAndOutputTerminalsByTerminalType = (terminals: Connector[]) => {
  let inputTerminalsByCategory = new Map<string, Connector[]>();
  let outputTerminalsByCategory = new Map<string, Connector[]>();

  for (let terminal of terminals) {
    if (IsInputTerminal(terminal)) InsertMapWithDefault(terminal.terminalTypeId, terminal, inputTerminalsByCategory);
    else InsertMapWithDefault(terminal.terminalTypeId, terminal, outputTerminalsByCategory);
  }

  return [inputTerminalsByCategory, outputTerminalsByCategory];
};

const InsertMapWithDefault = (key: string, value: Connector, map: Map<string, Connector[]>) => {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
};
