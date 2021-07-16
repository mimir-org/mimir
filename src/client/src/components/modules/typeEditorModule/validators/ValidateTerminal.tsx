import { TerminalTypeItem } from "../../../../models";

const ValidateTerminal = (terminal: TerminalTypeItem) => {
  return (
    terminal.selected &&
    terminal.terminalTypeId !== "" &&
    terminal.connectorType !== null
  );
};

export default ValidateTerminal;
