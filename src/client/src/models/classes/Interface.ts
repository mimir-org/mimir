import Connector from "./Connector";

class Interface {
  id: string;
  name: string;
  semanticReference: string;
  inputTerminalId: string;
  inputTerminal: Connector;
  outputTerminalId: string;
  outputTerminal: Connector;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() { }
}

export default Interface;
