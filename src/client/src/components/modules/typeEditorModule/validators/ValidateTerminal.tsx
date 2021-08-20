import { TerminalTypeItem } from "../../../../models";

const ValidateTerminal = (terminal: TerminalTypeItem) => {
  return (
    terminal.number > 0 &&
    terminal.number &&
    terminal.terminalTypeId !== "" &&
    (terminal.connectorType === 0 || terminal.connectorType === 1)
  );
};

export default ValidateTerminal;
