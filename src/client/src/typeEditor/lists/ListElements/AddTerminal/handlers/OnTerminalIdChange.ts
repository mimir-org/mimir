import { TerminalType, TerminalTypeItem } from "../../../../../models";

const OnTerminalIdChange = (item: TerminalType, defaultTerminal: TerminalTypeItem, onChange: Function) => {
  onChange("update", {...defaultTerminal, terminalTypeId: item.id});
};

export default OnTerminalIdChange;
