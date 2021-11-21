import { TerminalTypeItem } from "../../../../../models";

const OnQuantityChange = (item: number, defaultTerminal: TerminalTypeItem, onChange: Function) => {
  defaultTerminal.number = item;
  onChange("update", defaultTerminal);
};

export default OnQuantityChange;
