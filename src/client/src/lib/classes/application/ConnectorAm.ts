import { Direction } from "../../enums";
import {
  Connector,
  ConnectorFulfilledBy,
  ConnectorHasLocation,
  ConnectorPartOf,
  ConnectorRelation,
  ConnectorTerminal,
} from "../Connector";
import { AttributeAm } from "./AttributeAm";

export class ConnectorAm {
  id: string;
  name: string;
  inside: string;
  outside: string;
  direction: Direction;
  aspectObject: string;

  public constructor(obj: Connector) {
    this.id = obj.id;
    this.name = obj.name;
    this.inside = obj.inside;
    this.direction = obj.direction;
    this.aspectObject = obj.aspectObject;
  }
}

export class ConnectorTerminalAm extends ConnectorAm {
  color: string;
  attributes: AttributeAm[];
  referenceType: string;

  public constructor(obj: ConnectorTerminal) {
    super(obj);
    this.color = obj.color;
    this.attributes = obj.attributes.map((attribute) => new AttributeAm(attribute));
    this.referenceType = obj.referenceType;
  }
}

export class ConnectorRelationAm extends ConnectorAm {
  public constructor(obj: ConnectorRelation) {
    super(obj);
  }
}

export class ConnectorPartOfAm extends ConnectorRelationAm {
  public constructor(obj: ConnectorPartOf) {
    super(obj);
  }
}

export class ConnectorFulfilledByAm extends ConnectorRelationAm {
  public constructor(obj: ConnectorFulfilledBy) {
    super(obj);
  }
}

export class ConnectorHasLocationAm extends ConnectorRelationAm {
  public constructor(obj: ConnectorHasLocation) {
    super(obj);
  }
}
