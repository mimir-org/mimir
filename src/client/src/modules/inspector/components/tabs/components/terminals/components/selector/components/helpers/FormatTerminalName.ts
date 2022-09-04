import { ConnectorDirection, Terminal } from "@mimirorg/modelbuilder-types";

export const FormatTerminalName = (terminal: Terminal) =>
  `${terminal?.name} [${ConnectorDirection[terminal?.type].toLowerCase()}]`;
