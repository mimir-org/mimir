import { TerminalTypeItem } from "../../models";

const ValidateTerminal = (terminal: TerminalTypeItem) => {
  return (
    terminal.number > 0 &&
    terminal.number &&
    terminal.terminalTypeId !== "" &&
    (terminal.type === 0 || terminal.type === 1)
  );
};

export default ValidateTerminal;
