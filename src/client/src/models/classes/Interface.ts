import { Attribute, Connector } from ".";

class Interface {
  id: string;
  name: string;
  semanticReference: string;
  attributes: Attribute[];
  inputTerminalId: string;
  inputTerminal: Connector;
  outputTerminalId: string;
  outputTerminal: Connector;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Interface;
