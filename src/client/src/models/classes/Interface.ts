import { Attribute, Connector } from ".";

export const INTERFACE_KIND: string = "Interface";

class Interface {
  id: string;
  version: string;
  rds: string;
  name: string;
  label: string;
  description: string;
  statusId: string;
  semanticReference: string;
  attributes: Attribute[];
  inputTerminalId: string;
  inputTerminal: Connector;
  outputTerminalId: string;
  outputTerminal: Connector;
  updatedBy: string;
  updated: Date;
  createdBy: string;
  created: Date;
  libraryTypeId: string;

  kind: string = INTERFACE_KIND;

  constructor(otherInterface: Interface) {
    Object.assign(this, otherInterface);
  }
}

export default Interface;
