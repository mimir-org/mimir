import { TerminalsListElementWrapper } from "../../../../shared/styled/TerminalsListElementWrapper";
import { TerminalElementBox } from "./TerminalElementBox.styled";
import { FormatTerminalName } from "./helpers/FormatTerminalName";
import { ConnectorTerminal } from "lib";

interface Props {
  terminal: ConnectorTerminal;
  selectedTerminalId: string;
  onSelectTerminal: (id: string) => void;
}

/**
 * Component for a single terminal in the drop-down list of terminals.
 * @param props
 * @returns a terminal element.
 */
export const TerminalElement = ({ terminal, selectedTerminalId, onSelectTerminal }: Props) => (
  <TerminalsListElementWrapper>
    <TerminalElementBox
      key={terminal.id}
      selected={selectedTerminalId === terminal.id}
      onClick={() => onSelectTerminal(terminal.id)}
    >
      {FormatTerminalName(terminal)}
    </TerminalElementBox>
  </TerminalsListElementWrapper>
);

export default TerminalElement;
