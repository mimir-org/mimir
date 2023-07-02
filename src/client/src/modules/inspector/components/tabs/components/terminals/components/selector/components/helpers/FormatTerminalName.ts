import { ConnectorTerminal, ConnectorDirection } from "lib";

export const FormatTerminalName = (terminal: ConnectorTerminal) =>
  `${terminal?.name} [${ConnectorDirection[terminal?.direction].toLowerCase()}]`;
