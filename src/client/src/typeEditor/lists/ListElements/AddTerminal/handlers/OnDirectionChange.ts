import { TerminalTypeItem } from "../../../../../models";

const OnDirectionChange = (item: number, defaultTerminal: TerminalTypeItem, onChange: Function) => {
  onChange("update", {...defaultTerminal, connectorType: Number(item)});
};

export default OnDirectionChange;
