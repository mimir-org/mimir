import { Direction } from "..";
import { ConnectorAm, ConnectorTerminalAm, Attribute } from ".";
import { CreateId } from "components/flow/helpers";
import { TerminalLibCm } from "@mimirorg/typelibrary-types";
import { ConnectorPartOfAm, ConnectorFulfilledByAm, ConnectorHasLocationAm } from "lib";
import { Color } from "assets/color/Color";

/**
 * Abstract Connector class.
 * This is the parent class for all connector types.
 */
export abstract class Connector {
  // Domain members
  public id: string;
  public name: string;
  public direction: Direction;
  public inside: string;
  public outside: string;
  public aspectObject: string;

  // Client members
  public hidden: boolean;

  // Constructor
  public constructor(name: string, direction: Direction, aspectObject?: string) {
    this.id = CreateId();
    this.name = name;
    this.direction = direction;
    this.inside = CreateId();
    this.outside = CreateId();
    this.aspectObject = aspectObject == null ? null : aspectObject;
    this.hidden = false;
  }

  // Abstract function definition of converting object to application model
  public abstract toAm(): ConnectorAm;

  // Abstract function definition of connector color
  public abstract getColor(): string;
}

/**
 * A terminal connector.
 * This class extends the connector class.
 */
export class ConnectorTerminal extends Connector {
  // Domain members
  public terminalType: string;
  public terminalParentType: string;
  public referenceType: string;
  public color: string;
  public attributes: Attribute[];

  // Constructor
  public constructor(lib: TerminalLibCm, direction: Direction, aspectObject?: string) {
    super(lib.name, direction, aspectObject);
    this.terminalType = lib.iri;
    this.terminalParentType = lib.parentIri;
    this.referenceType = lib.typeReferences[0].iri;
    this.color = lib.color;
    this.attributes = lib.attributes?.map((x) => new Attribute(x, null, this.id));
  }

  // Implementation of extended abstrackt method for converting to application model
  public toAm(): ConnectorTerminalAm {
    return new ConnectorTerminalAm(this);
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
export abstract class ConnectorRelation extends Connector {
  public constructor(name: string, direction: Direction, aspectObject?: string) {
    super(name, direction, aspectObject);
  }
}

/**
 * A partof connector.
 * This class extends the ConnectorRelation class.
 */
export class ConnectorPartOf extends ConnectorRelation {
  public constructor(name: string, direction: Direction, aspectObject?: string) {
    super(name, direction, aspectObject);
  }

  // Implementation of extended abstrackt method for converting to application model
  public toAm(): ConnectorPartOfAm {
    return new ConnectorPartOfAm(this);
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
export class ConnectorFulfilledBy extends ConnectorRelation {
  public constructor(name: string, direction: Direction, aspectObject?: string) {
    super(name, direction, aspectObject);
  }

  // Implementation of extended abstrackt method for converting to application model
  public toAm(): ConnectorFulfilledByAm {
    return new ConnectorFulfilledByAm(this);
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
export class ConnectorHasLocation extends ConnectorRelation {
  public constructor(name: string, direction: Direction, aspectObject?: string) {
    super(name, direction, aspectObject);
  }

  // Implementation of extended abstrackt method for converting to application model
  public toAm(): ConnectorHasLocationAm {
    return new ConnectorHasLocationAm(this);
  }

  public getColor(): string {
    //   if (IsProductRelation(connector)) return Color.VIRIDIAN_GREEN;
    // if (IsLocationRelation(connector)) return Color.PURPLE_MUNSELL;
    return Color.BLACK;
  }
}
