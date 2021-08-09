import Connector from "./Connector";

class Interface {
    id: string;
    name: string;
    semanticReference: string;
    terminalId: string;
    terminal: Connector;


    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() { }
}

export default Interface;
