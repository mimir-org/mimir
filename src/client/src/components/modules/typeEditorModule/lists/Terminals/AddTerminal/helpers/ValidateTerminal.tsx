import { TerminalTypeItem } from "../../../../../../../models";

const ValidateTerminal = (terminal: TerminalTypeItem) => {
  return (
    terminal.terminalTypeId !== "" &&
    terminal.number !== 0 &&
    terminal.connectorType !== null
  );
};

export default ValidateTerminal;
