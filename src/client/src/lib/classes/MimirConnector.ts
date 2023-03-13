import { AttributeCm, ConnectorCm, ConnectorRelationCm, TypeReferenceCm } from "../types/FutureTypes";
import { Direction } from "../types/enums/Direction";

export class MimirConnector implements ConnectorCm {
  aspectObject: string;
  direction: Direction;
  id: string;
  inside: string;
  name: string;
  outside: string;
  terminalParentType: string | null;
  terminalType: string;
}

export class ConnectorTerminal extends MimirConnector {
  color: string;
  attributes: AttributeCm[] | null;
  typeReferences: TypeReferenceCm[] | null;
}

export class ConnectorRelation implements ConnectorRelationCm {
  aspectObject: string;
  direction: Direction;
  id: string;
  inside: string;

  name: string;
  outside: string;
  terminalParentType: string | null;
  terminalType: string;
}

export class ConnectorPartOf extends ConnectorRelation {}

export class ConnectorFulfilledBy extends ConnectorRelation {}

export class ConnectorHasLocation extends ConnectorRelation {}
