import { Attribute, Connector } from ".";

export const INTERFACE_KIND: string = "Interface";

class Interface {
  id: string;
  name: string;
  semanticReference: string;
  attributes: Attribute[];
  inputTerminalId: string;
  inputTerminal: Connector;
  outputTerminalId: string;
  outputTerminal: Connector;

  kind: string = INTERFACE_KIND;

  constructor(otherInterface: Interface) {
    Object.assign(this, otherInterface);
  }
}

export default Interface;
