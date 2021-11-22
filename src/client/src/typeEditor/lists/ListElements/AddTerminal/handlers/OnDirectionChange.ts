import { TerminalTypeItem } from "../../../../../models";

const OnDirectionChange = (item: number, defaultTerminal: TerminalTypeItem, onChange: Function) => {
  defaultTerminal.connectorType = Number(item);
  onChange("update", defaultTerminal);
};

export default OnDirectionChange;
