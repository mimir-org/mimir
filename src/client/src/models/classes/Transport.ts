import { Attribute, Connector } from ".";

export const TRANSPORT_KIND: string = "Transport";

class Transport {
  id: string;
  name: string;
  semanticReference: string;
  attributes: Attribute[];
  inputTerminalId: string;
  inputTerminal: Connector;
  outputTerminalId: string;
  outputTerminal: Connector;

  kind: string = TRANSPORT_KIND;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Transport;
