/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Connector,
  ConnectorFulfilledBy,
  ConnectorHasLocation,
  ConnectorPartOf,
  ConnectorRelation,
  ConnectorTerminal,
} from "./Connector";
import { Attribute } from "./Attribute";
import { Aspect, AspectObjectType, ConnectorDirection, ViewType } from "../enums";
import { Node as FlowNode, XYPosition } from "react-flow-renderer";
import type { AspectObjectLibCm, AspectObjectTerminalLibCm } from "@mimirorg/typelibrary-types";
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { Position } from "./Position";
import { MenuItem } from "compLibrary/menu/overflow/OverflowItem";
import { AspectColor } from "./AspectColor";
import { Theme } from "@mimirorg/component-library";
import CreateId from "lib/CreateId";
import { InfoException } from "lib/exceptions";
import { ErrorException } from "lib";
import { Connection } from "./Connection";

@jsonObject({
  knownTypes: [ConnectorTerminal, ConnectorRelation, ConnectorPartOf, ConnectorFulfilledBy, ConnectorHasLocation],
})
export class AspectObject {
  // Domain members
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public version: string;

  @jsonMember(String)
  public name: string;

  @jsonMember(String)
  public label: string;

  @jsonMember(String)
  public description: string;

  @jsonMember(Number)
  public aspect: Aspect;

  @jsonMember(Number)
  public aspectObjectType: AspectObjectType;

  @jsonMember(String)
  public project: string;

  @jsonMember(String)
  public mainProject: string;

  @jsonMember(String)
  public libraryType: string;

  @jsonMember(Position)
  public positionTree: Position;

  @jsonMember(Position)
  public positionBlock: Position;

  @jsonMember(String)
  public referenceType: string;

  @jsonMember(String)
  public createdBy: string;

  @jsonMember(Date)
  public created: Date;

  @jsonMember(String)
  public updatedBy: string;

  @jsonMember(Date)
  public updated: Date | null;

  @jsonMember(String)
  public rds: string;

  @jsonMember(String)
  public symbol: string;

  @jsonMember(String)
  public purpose: string;

  @jsonMember(Boolean)
  public isLocked: boolean;

  @jsonMember(String)
  public isLockedStatusBy: string;

  @jsonMember(Date)
  public isLockedStatusDate: Date | null;

  @jsonArrayMember(Attribute)
  public attributes: Attribute[] | null = [];

  @jsonArrayMember(Connector)
  public connectors: Connector[] | null = [];

  // Client members
  public selected: boolean;
  public blockSelected: boolean;
  public hidden: boolean;
  public domain: string;
  public aspectColor: AspectColor;

  /**
   * Constructor.
   * @params lib The library type to be constructed from.
   * @params project Current project id.
   * @params positionTree The x,y position or coordinate in tree view.
   * @params positionBlock The x,y position or coordinate in block view.
   * @params createdBy The creator username.
   * @params mainProject The originally project owner id.
   */
  public constructor(
    lib: AspectObjectLibCm,
    project: string,
    positionTree: Position,
    positionBlock: Position,
    createdBy?: string,
    mainProject?: string
  ) {
    this.id = CreateId();
    this.rds = lib?.rdsCode;
    this.aspectObjectType = lib != null ? AspectObjectType.Aspect : AspectObjectType.Root;
    this.description = lib?.description;
    this.referenceType = lib?.typeReference;
    this.name = lib?.name;
    this.label = lib?.name;

    this.positionTree = positionTree;
    this.positionBlock = positionBlock;
    this.updated = null;
    this.updatedBy = null;
    this.created = new Date();
    this.createdBy = createdBy == null ? "system" : createdBy;
    this.libraryType = lib?.iri;
    this.version = "1.0";
    this.aspect = lib?.aspect;
    this.mainProject = mainProject == null ? project : mainProject;
    this.symbol = lib?.symbol;
    this.purpose = lib?.purposeName;
    this.project = project;
    this.attributes = lib?.attributes?.map((x) => new Attribute(x, this.id)) ?? [];

    this.connectors =
      lib?.aspectObjectTerminals?.map((x) => new ConnectorTerminal(x.terminal, x.connectorDirection, this.id)) ?? [];

    this.isLocked = false;
    this.isLockedStatusBy = null;
    this.isLockedStatusDate = null;

    this.selected = false;
    this.blockSelected = false;
    this.hidden = false;
    this.domain = this.id.split("_")[0].trim();
    this.createDefaultConnectors();
  }

  /**
   * Create all default connectors to connect between aspects.
   */
  public createDefaultConnectors() {
    this.connectors.push(new ConnectorPartOf("partof", ConnectorDirection.Output, this.id));
    if (this.aspectObjectType == AspectObjectType.Root) return;

    this.connectors.push(new ConnectorPartOf("partof", ConnectorDirection.Input, this.id));

    switch (this.aspect) {
      case Aspect.Function:
        this.connectors.push(new ConnectorFulfilledBy("fulfilledby", ConnectorDirection.Output, this.id));
        break;
      case Aspect.Product:
        this.connectors.push(new ConnectorFulfilledBy("fulfilledby", ConnectorDirection.Input, this.id));
        this.connectors.push(new ConnectorHasLocation("haslocation", ConnectorDirection.Output, this.id));
        break;
      case Aspect.Location:
        this.connectors.push(new ConnectorHasLocation("haslocation", ConnectorDirection.Input, this.id));
        break;
    }
  }

  /**
   * Create a new terminal for this aspect object
   * If it is not allowed to create a new terminal, the function will return.
   * @param aspectObjectType The aspect object type to create a terminal from.
   * @param direction The terminal direction
   */
  public createTerminal(aspectObjectType: AspectObjectTerminalLibCm, direction: ConnectorDirection): void {
    if (aspectObjectType == null || aspectObjectType.terminal == null || direction == null)
      throw new Error("Can't create terminal. TerminalType or direction is null or undefined.");

    const existingTerminals = this.connectors.filter(
      (c) => c instanceof ConnectorTerminal && c.terminalType === aspectObjectType.terminal.iri && c.direction === direction
    );

    if (existingTerminals.length >= aspectObjectType.maxQuantity)
      throw new InfoException("The maximum number of terminals of this type has been reached.");

    const terminal = new ConnectorTerminal(aspectObjectType.terminal, direction, this.id);
    this.connectors.push(terminal);
  }

  /**
   * Delete a terminal for this aspect object
   * If it is not allowed to delete the terminal, an InfoException will be thrown.
   * @param aspectObjectType The aspect object type with rules for terminal.
   * @param terminalId The terminal id to be deleted
   * @param connections All connections for project
   */
  public deleteTerminal(aspectObjectType: AspectObjectTerminalLibCm, terminalId: string, connections: Connection[]): void {
    if (aspectObjectType == null || aspectObjectType.terminal == null || terminalId == null)
      throw new Error("Can't delete terminal. TerminalType, direction or terminal id is null or undefined.");

    const existingTerminal = this.getTerminal(terminalId);
    if (existingTerminal == null) throw new ErrorException("Can't find terminal with id: " + terminalId);

    const existingTerminals = this.getTerminals().filter(
      (x) => x.terminalType === aspectObjectType.terminal.iri && x.direction === existingTerminal.direction
    );

    const hasConnection = connections.some((x) => x.fromConnector === terminalId || x.toConnector === terminalId);
    if (hasConnection) throw new InfoException("You can't delete a connected terminal. Please delete the connection first.");

    if (existingTerminals.length <= aspectObjectType.minQuantity)
      throw new InfoException("The minimum number of terminals of this type has been reached.");

    this.connectors = this.connectors.filter((x) => x.id !== terminalId);
  }

  /** Convert Aspect Object to a flow node based on different views
   *  @params ViewType There are two diffenrent views in Mimir "Home" | "Tree" | "Block"
   *  @params theme Current theme
   */
  public toFlowNode(viewType: ViewType, theme: Theme, parent: boolean): FlowNode {
    const position: XYPosition = {
      x: viewType === ViewType.Block ? this.positionBlock.posX : this.positionTree.posX,
      y: viewType === ViewType.Block ? this.positionBlock.posY : this.positionTree.posY,
    };

    this.aspectColor = new AspectColor();
    this.aspectColor.resolveColors(theme, this.aspect);

    const node: FlowNode = {
      id: this.id,
      type: parent ? "ParentNode" : this.getComponentType(viewType),
      data: this,
      position: position,
      hidden: this.hidden,
      selected: this.selected,
      draggable: true,
      selectable: true,
      connectable: true,
    };
    return node;
  }

  public terminalsToFlowNode(): FlowNode[] {
    return [];
  }

  /**
   * Convert aspect object connectors to menu-items
   * @param orientation "Left" | "Right"
   * @returns An array of menu-items
   */
  public toMenuItems(orientation: "Left" | "Right"): MenuItem[] {
    if (this.connectors == null) return [];
    if (orientation === "Left") {
      return this.connectors
        .filter((x) => x instanceof ConnectorTerminal && x.direction === ConnectorDirection.Input)
        .map((x) => x instanceof ConnectorTerminal && x.toMenuItem());
    } else {
      return this.connectors
        .filter((x) => x instanceof ConnectorTerminal && x.direction === ConnectorDirection.Output)
        .map((x) => x instanceof ConnectorTerminal && x.toMenuItem());
    }
  }

  /**
   * Update or replace a connector with given connector
   * @param connector The connector to update
   */
  public updateConnector(connector: Connector): void {
    if (this.connectors == null) return;
    this.connectors = this.connectors.map((x) =>
      x.id === connector.id || x.inside === connector.id || x.outside === connector.id ? connector : x
    );
  }

  public hasConnector(connector: string): boolean {
    return this.connectors?.some((x) => x.id === connector || x.inside === connector || x.outside === connector);
  }

  public getComponentType(viewType: ViewType): string | null {
    let typeName = this.libraryType == null ? "Aspect" : viewType === ViewType.Block ? "Block" : "Tree";
    typeName += Aspect[this.aspect];
    return typeName;
  }

  /**
   * Get connector by id. The first connector that matches id, inside or outside will be returned
   * @param connectorId The connector id
   * @returns Connector match or null if not exist
   */
  public getConnector(connectorId: string): Connector | null {
    return this.connectors.find((x) => x.id === connectorId || x.inside === connectorId || x.outside === connectorId);
  }

  /**
   * Get treeview connectors
   * @returns All connectors that is not hidden
   */
  public getTreeviewConnectors(): Connector[] {
    return this.connectors.map((x) => {
      if (x instanceof ConnectorPartOf || x instanceof ConnectorHasLocation || x instanceof ConnectorFulfilledBy) {
        x.hidden = false;
        return x;
      } else {
        // TODO: Visual filter should overide this setting if transport should be visible in treeview
        x.hidden = false;
        return x;
      }
    });
  }

  /**
   * Get blockview connectors.
   * Only selected connectors is visible.
   * @returns All connectors that is not hidden
   */
  public getBlockviewConnectors(): Connector[] {
    return this.connectors.map((x) => {
      if (x instanceof ConnectorTerminal && x.selected) {
        x.hidden = false;
        return x;
      } else {
        // TODO: Visual filter should overide this setting if realtions should be visiible in treeview
        x.hidden = true;
        return x;
      }
    });
  }

  public getTerminals(): ConnectorTerminal[] {
    return this.connectors.filter((g) => g instanceof ConnectorTerminal) as ConnectorTerminal[];
  }

  public getTerminal(id: string): ConnectorTerminal {
    const terminal = this.getTerminals().find((x) => x.id === id || x.inside === id || x.outside === id);
    return terminal != null ? terminal : null;
  }

  public getRdsId(): string {
    if (this.rds == null || this.rds.length < 1) return "";
    return this.getRdsPrefix() + this.rds;
  }

  public getRdsPrefix(): string {
    if (this.aspect === Aspect.Function) return "=";
    if (this.aspect === Aspect.Product) return "-";
    if (this.aspect === Aspect.Location) return "+";
    return "";
  }

  public isRoot(): boolean {
    return this.aspectObjectType === AspectObjectType.Root;
  }
}
