import { TerminalType, TerminalTypeItem } from "../../../../../models";

const OnTerminalIdChange = (item: TerminalType, defaultTerminal: TerminalTypeItem, onChange: Function) => {
  defaultTerminal.terminalTypeId = item.id;
  onChange("update", defaultTerminal);
};

export default OnTerminalIdChange;
