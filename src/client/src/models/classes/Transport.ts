import Connector from "./Connector";
import Attribute from "./Attribute";

class Transport {
  id: string;
  name: string;
  semanticReference: string;
  terminalId: string;
  terminal: Connector;
  attributes: Attribute[];

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Transport;
