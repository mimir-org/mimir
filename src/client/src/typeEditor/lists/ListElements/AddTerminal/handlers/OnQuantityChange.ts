import { TerminalTypeItem } from "../../../../../models";

const OnQuantityChange = (item: number, defaultTerminal: TerminalTypeItem, onChange: Function) => {
  onChange("update", { ...defaultTerminal, number: item });
};

export default OnQuantityChange;
