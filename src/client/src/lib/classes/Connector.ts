/* eslint-disable @typescript-eslint/no-unused-vars */
import { Aspect, ConnectorDirection, ViewType } from "../enums";
import { Attribute } from "./Attribute";
import type { TerminalLibCm } from "@mimirorg/typelibrary-types";
import { Color } from "assets/color/Color";
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { HandleType, Position } from "react-flow-renderer";
import { MenuItem } from "compLibrary/menu/overflow/OverflowItem";
import CreateId from "lib/CreateId";

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
  public selected: boolean;

  // Constructor
  public constructor(name: string, direction: ConnectorDirection, aspectObject?: string) {
    this.id = CreateId();
    this.name = name;
    this.direction = direction;
    this.inside = CreateId();
    this.outside = CreateId();
    this.aspectObject = aspectObject == null ? null : aspectObject;
    this.hidden = false;
    this.selected = false;
  }

  // Abstract function definition of connector color
  public abstract getColor(): string;

  // Abstract function definition of connector class name
  public abstract getClassName(aspect: Aspect, viewtype: ViewType): string;

  // Abstract function definition of connector class name
  public abstract GetHandleType(): [HandleType, Position];
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
    this.terminalParentType = null;
    this.referenceType = lib?.typeReference;
    this.color = lib?.color;
    this.attributes = lib?.attributes?.map((x) => new Attribute(x, null, this.id)) ?? [];
  }

  // Implementation of extended abstrackt method
  public getColor(): string {
    return this.color;
  }

  // Implementation of extended abstrackt method
  public getClassName(aspect: Aspect, viewtype: ViewType): string {
    const aspectName = Aspect[aspect].toLowerCase();
    const viewTypeName = ViewType[viewtype].toLowerCase() + "view";
    return `${aspectName}-${viewTypeName}-handler partOf`;
  }

  // Implementation of extended abstrackt method
  public GetHandleType(): [HandleType, Position] {
    if (this.direction === ConnectorDirection.Input || this.direction === ConnectorDirection.Bidirectional)
      return ["target", Position.Right];
    if (this.direction === ConnectorDirection.Output || this.direction === ConnectorDirection.Bidirectional)
      return ["source", Position.Left];
    return ["source", Position.Left];
  }

  public toMenuItem(): MenuItem {
    const item: MenuItem = {
      id: this.id,
      name: this.name,
      checked: this.selected,
      color: this.color,
    };
    return item;
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

  // Implementation of extended abstrackt method
  public getColor(): string {
    //   if (IsProductRelation(connector)) return Color.VIRIDIAN_GREEN;
    // if (IsLocationRelation(connector)) return Color.PURPLE_MUNSELL;
    return Color.BLACK;
  }

  // Implementation of extended abstrackt method
  public getClassName(aspect: Aspect, viewtype: ViewType): string {
    const aspectName = Aspect[aspect].toLowerCase();
    const viewTypeName = ViewType[viewtype].toLowerCase() + "view";
    return `${aspectName}-${viewTypeName}-handler partOf`;
  }

  // Implementation of extended abstrackt method
  public GetHandleType(): [HandleType, Position] {
    if (this.direction === ConnectorDirection.Input) return ["target", Position.Top];
    else return ["source", Position.Bottom];
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

  // Implementation of extended abstrackt method
  public getClassName(aspect: Aspect, viewtype: ViewType): string {
    const aspectName = Aspect[aspect].toLowerCase();
    const viewTypeName = ViewType[viewtype].toLowerCase() + "view";
    return `${aspectName}-${viewTypeName}-handler fulfilledBy`;
  }

  // Implementation of extended abstrackt method
  public GetHandleType(): [HandleType, Position] {
    if (this.direction === ConnectorDirection.Input) return ["target", Position.Left];
    else return ["source", Position.Right];
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

  // Implementation of extended abstrackt method
  public getClassName(aspect: Aspect, viewtype: ViewType): string {
    const aspectName = Aspect[aspect].toLowerCase();
    const viewTypeName = ViewType[viewtype].toLowerCase() + "view";
    return `${aspectName}-${viewTypeName}-handler locatedAt`;
  }

  // Implementation of extended abstrackt method
  public GetHandleType(): [HandleType, Position] {
    if (this.direction === ConnectorDirection.Input) return ["target", Position.Left];
    else return ["source", Position.Right];
  }
}
