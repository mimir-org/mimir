/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConnectorDirection } from "../enums";
import { Attribute } from "./Attribute";
import { CreateId } from "components/flow/helpers";
import type { TerminalLibCm } from "@mimirorg/typelibrary-types";
import { Color } from "assets/color/Color";
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";

/**
 * Abstract Connector class.
 * This is the parent class for all connector types.
 */
@jsonObject
export abstract class Connector {
  // Domain members
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public name: string;

  @jsonMember(Number)
  public direction: ConnectorDirection;

  @jsonMember(String)
  public inside: string;

  @jsonMember(String)
  public outside: string;

  @jsonMember(String)
  public aspectObject: string;

  // Client members
  public hidden: boolean;

  // Constructor
  public constructor(name: string, direction: ConnectorDirection, aspectObject?: string) {
    this.id = CreateId();
    this.name = name;
    this.direction = direction;
    this.inside = CreateId();
    this.outside = CreateId();
    this.aspectObject = aspectObject == null ? null : aspectObject;
    this.hidden = false;
  }

  // Abstract function definition of connector color
  public abstract getColor(): string;
}

/**
 * A terminal connector.
 * This class extends the connector class.
 */
@jsonObject
export class ConnectorTerminal extends Connector {
  // Domain members
  @jsonMember(String)
  public terminalType: string;

  @jsonMember(String)
  public terminalParentType: string;

  @jsonMember(String)
  public referenceType: string;

  @jsonMember(String)
  public color: string;

  @jsonArrayMember(Attribute)
  public attributes: Array<Attribute>;

  // Constructor
  public constructor(lib: TerminalLibCm, direction: ConnectorDirection, aspectObject?: string) {
    super(lib?.name, direction, aspectObject);
    this.terminalType = lib?.iri;
    this.terminalParentType = lib?.parentIri;
    this.referenceType = lib?.typeReferences[0].iri;
    this.color = lib?.color;
    this.attributes = lib?.attributes?.map((x) => new Attribute(x, null, this.id)) ?? [];
  }

  // Implementation of extended abstrackt method for converting to application model
  public getColor(): string {
    return this.color;
  }
}

/**
 * An abstract parent class of all types of relation connectors.
 * This class extends the connector class.
 */
@jsonObject
export abstract class ConnectorRelation extends Connector {
  public constructor(name: string, direction: ConnectorDirection, aspectObject?: string) {
    super(name, direction, aspectObject);
  }
}

/**
 * A partof connector.
 * This class extends the ConnectorRelation class.
 */
@jsonObject
export class ConnectorPartOf extends ConnectorRelation {
  public constructor(name: string, direction: ConnectorDirection, aspectObject?: string) {
    super(name, direction, aspectObject);
  }

  // Implementation of extended abstrackt method for converting to application model
  public getColor(): string {
    //   if (IsProductRelation(connector)) return Color.VIRIDIAN_GREEN;
    // if (IsLocationRelation(connector)) return Color.PURPLE_MUNSELL;
    return Color.BLACK;
  }
}

/**
 * A fulfilledby connector.
 * This class extends the ConnectorRelation class.
 */
@jsonObject
export class ConnectorFulfilledBy extends ConnectorRelation {
  public constructor(name: string, direction: ConnectorDirection, aspectObject?: string) {
    super(name, direction, aspectObject);
  }

  public getColor(): string {
    //   if (IsProductRelation(connector)) return Color.VIRIDIAN_GREEN;
    // if (IsLocationRelation(connector)) return Color.PURPLE_MUNSELL;
    return Color.BLACK;
  }
}

/**
 * A haslocation connector.
 * This class extends the ConnectorRelation class.
 */
@jsonObject
export class ConnectorHasLocation extends ConnectorRelation {
  public constructor(name: string, direction: ConnectorDirection, aspectObject?: string) {
    super(name, direction, aspectObject);
  }

  public getColor(): string {
    //   if (IsProductRelation(connector)) return Color.VIRIDIAN_GREEN;
    // if (IsLocationRelation(connector)) return Color.PURPLE_MUNSELL;
    return Color.BLACK;
  }
}
