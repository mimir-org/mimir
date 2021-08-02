import { TerminalTypeItem } from "../../../../models";

const ValidateTerminal = (terminal: TerminalTypeItem) => {
  return (
    terminal.number &&
    terminal.terminalTypeId !== "" &&
    terminal.connectorType !== null
  );
};

export default ValidateTerminal;
