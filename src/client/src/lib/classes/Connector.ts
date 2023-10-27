/* eslint-disable @typescript-eslint/no-unused-vars */
import { Aspect, ConnectorDirection, ViewType } from "../enums";
import { Attribute } from "./Attribute";
import type { TerminalLibCm } from "@mimirorg/typelibrary-types";
import { Color } from "assets/color/Color";
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { HandleType, Position, Node as FlowNode, XYPosition } from "react-flow-renderer";
import { MenuItem } from "compLibrary/menu/overflow/OverflowItem";
import CreateId from "../CreateId";
import { FlowHandle } from "../interfaces/FlowHandle";
import { Theme } from "@mimirorg/component-library";
import { AspectColor } from "./AspectColor";

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
  public block: string;

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
    this.block = aspectObject == null ? null : aspectObject;
    this.hidden = false;
    this.selected = false;
  }

  // Abstract function definition of connector color
  public abstract getColor(): string;

  // Abstract function definition of connector class name
  public abstract getClassName(aspect: Aspect, viewtype: ViewType): string;

  // Abstract function definition of connector handle type
  public abstract GetHandleType(): [HandleType, Position];

  /**
   * Get all flow handles from connector
   * @param aspect Current aspect
   * @param viewtype Current viewtype
   * @returns A collection of flow handles
   */
  public abstract getFlowtHandles(aspect: Aspect, viewtype: ViewType): FlowHandle[];

  /**
   * Calculate hidden status of a flow handle
   * @param side The side of the connector. Could be "inside" | "outside".
   * @returns The hidden status
   */
  public abstract flowHandleHidden(side: "inside" | "outside"): boolean;
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
    return `${aspectName}-${viewTypeName}-handler terminal`;
  }

  // Implementation of extended abstrackt method
  public GetHandleType(): [HandleType, Position] {
    if (this.direction === ConnectorDirection.Input || this.direction === ConnectorDirection.Bidirectional)
      return ["target", Position.Right];
    if (this.direction === ConnectorDirection.Output || this.direction === ConnectorDirection.Bidirectional)
      return ["source", Position.Left];
    return ["source", Position.Left];
  }

  // Abstract function implementation of get all flow handles from connector
  public getFlowtHandles(aspect: Aspect, viewtype: ViewType): FlowHandle[] {
    const insideHandle: FlowHandle = {
      id: this.inside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Left : Position.Right,
      handleType: "target",
      side: "inside",
      hidden: this.flowHandleHidden("inside"),
      className: this.getClassName(aspect, viewtype),
    };

    const outsideHandle: FlowHandle = {
      id: this.outside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Left : Position.Right,
      handleType: "source",
      side: "outside",
      hidden: this.flowHandleHidden("outside"),
      className: this.getClassName(aspect, viewtype),
    };

    const flowHandles: FlowHandle[] = [insideHandle, outsideHandle];
    return flowHandles;
  }

  // Abstract function implementation of calculate hidden status of a flow handle
  public flowHandleHidden(side: "inside" | "outside"): boolean {
    if (this.hidden) return true;
    if (this.direction === ConnectorDirection.Input && side === "inside") return false;
    if (this.direction === ConnectorDirection.Output && side === "outside") return false;
    return true;
  }

  /**
   * Represent a connector terminal as a menu item
   * @returns A converted menu item
   */
  public toMenuItem(): MenuItem {
    const item: MenuItem = {
      id: this.id,
      name: this.name,
      checked: this.selected,
      color: this.color,
    };
    return item;
  }

  /** Convert a handle to a flow node
   *  @params ViewType There are two diffenrent views in Mimir "Home" | "Tree" | "Block"
   *  @params theme Current theme
   */
  public toFlowNode(viewType: ViewType, theme: Theme, min: number, max: number, index: number): FlowNode<ConnectorTerminal> {
    const y = index * 150;
    const position: XYPosition = {
      x: this.direction === ConnectorDirection.Input ? min - 400 : max + 500,
      y: y,
    };

    const node: FlowNode = {
      id: CreateId(),
      type: this.getComponentType(viewType),
      data: this,
      position: position,
      hidden: false,
      selected: false,
      draggable: false,
      selectable: false,
      connectable: true,
    };
    return node;
  }

  public toFlowNodeHandle(): FlowHandle {
    const flowHandle: FlowHandle = {
      id: this.direction === ConnectorDirection.Input ? this.outside : this.inside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Right : Position.Left,
      handleType: this.direction === ConnectorDirection.Input ? "source" : "target",
      side: this.direction === ConnectorDirection.Input ? "outside" : "inside",
      hidden: this.hidden,
      className: "parent-handler terminal",
    };
    return flowHandle;
  }

  private getComponentType(viewType: ViewType): string | null {
    const viewTypeName = viewType === ViewType.Block ? "Block" : "Tree";
    return viewTypeName + "Connector";
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

  // Abstract function implementation of get all flow handles from connector
  public getFlowtHandles(aspect: Aspect, viewtype: ViewType): FlowHandle[] {
    const insideHandle: FlowHandle = {
      id: this.inside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Top : Position.Bottom,
      handleType: "target",
      side: "inside",
      hidden: this.flowHandleHidden("inside"),
      className: this.getClassName(aspect, viewtype),
    };

    const outsideHandle: FlowHandle = {
      id: this.outside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Top : Position.Bottom,
      handleType: "source",
      side: "outside",
      hidden: this.flowHandleHidden("outside"),
      className: this.getClassName(aspect, viewtype),
    };

    const flowHandles: FlowHandle[] = [insideHandle, outsideHandle];
    return flowHandles;
  }

  // Abstract function implementation of calculate hidden status of a flow handle
  public flowHandleHidden(side: "inside" | "outside"): boolean {
    if (this.hidden) return true;
    if (this.direction === ConnectorDirection.Input && side === "inside") return false;
    if (this.direction === ConnectorDirection.Output && side === "outside") return false;
    return true;
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

  // Abstract function implementation of get all flow handles from connector
  public getFlowtHandles(aspect: Aspect, viewtype: ViewType): FlowHandle[] {
    const insideHandle: FlowHandle = {
      id: this.inside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Left : Position.Right,
      handleType: "target",
      side: "inside",
      hidden: this.flowHandleHidden("inside"),
      className: this.getClassName(aspect, viewtype),
    };

    const outsideHandle: FlowHandle = {
      id: this.outside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Left : Position.Right,
      handleType: "source",
      side: "outside",
      hidden: this.flowHandleHidden("outside"),
      className: this.getClassName(aspect, viewtype),
    };

    const flowHandles: FlowHandle[] = [insideHandle, outsideHandle];
    return flowHandles;
  }

  // Abstract function implementation of calculate hidden status of a flow handle
  public flowHandleHidden(side: "inside" | "outside"): boolean {
    if (this.hidden) return true;
    if (this.direction === ConnectorDirection.Input && side === "inside") return false;
    if (this.direction === ConnectorDirection.Output && side === "outside") return false;
    return true;
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

  // Abstract function implementation of get all flow handles from connector
  public getFlowtHandles(aspect: Aspect, viewtype: ViewType): FlowHandle[] {
    const insideHandle: FlowHandle = {
      id: this.inside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Left : Position.Right,
      handleType: "target",
      side: "inside",
      hidden: this.flowHandleHidden("inside"),
      className: this.getClassName(aspect, viewtype),
    };

    const outsideHandle: FlowHandle = {
      id: this.outside,
      connectorId: this.id,
      position: this.direction === ConnectorDirection.Input ? Position.Left : Position.Right,
      handleType: "source",
      side: "outside",
      hidden: this.flowHandleHidden("outside"),
      className: this.getClassName(aspect, viewtype),
    };

    const flowHandles: FlowHandle[] = [insideHandle, outsideHandle];
    return flowHandles;
  }

  // Abstract function implementation of calculate hidden status of a flow handle
  public flowHandleHidden(side: "inside" | "outside"): boolean {
    if (this.hidden) return true;
    if (this.direction === ConnectorDirection.Input && side === "inside") return false;
    if (this.direction === ConnectorDirection.Output && side === "outside") return false;
    return true;
  }
}
