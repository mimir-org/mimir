import { ConnectorTerminal, Direction } from "lib";

export const FormatTerminalName = (terminal: ConnectorTerminal) =>
  `${terminal?.name} [${Direction[terminal?.direction].toLowerCase()}]`;
