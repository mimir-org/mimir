import { Attribute, TypeReference } from ".";
import { Direction } from "../enums";

export class Connector {
  id: string;
  name: string;
  direction: Direction;
  aspectObject: string;
  terminalType: string;
  terminalParentType: string;
  inside: string;
  outside: string;
}

export class ConnectorTerminal extends Connector {
  color: string;
  attributes: Attribute[];
  typeReferences: TypeReference[];
}

export class ConnectorRelation extends Connector {}

export class ConnectorPartOf extends ConnectorRelation {}

export class ConnectorFulfilledBy extends ConnectorRelation {}

export class ConnectorHasLocation extends ConnectorRelation {}
