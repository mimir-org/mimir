/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Block,
  Connection,
  ConnectorPartOf,
  ConnectorTerminal,
  ConnectionTerminal,
  ConnectionPartOf,
  ConnectorFulfilledBy,
  ConnectionFulfilledBy,
  ConnectorHasLocation,
  ConnectionHasLocation,
  Connector,
  ConnectionRelation,
  Position,
} from ".";
import { Connection as FlowConnection, Edge as FlowEdge, Node as FlowNode, XYPosition } from "react-flow-renderer";
import { ConnectorDirection, ViewType } from "../enums";
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { ProjectListItem } from "../interfaces";
import { BlockLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { Aspect } from "lib/enums";
import { Theme } from "@mimirorg/component-library";
import { Handle } from "./Handle";
import { ErrorException } from "lib";

@jsonObject({
  knownTypes: [ConnectionTerminal, ConnectionRelation, ConnectionFulfilledBy, ConnectionHasLocation, ConnectionPartOf],
})
export class Project {
  // Domain members
  @jsonMember(String)
  public id: string | null;

  @jsonMember(String)
  public name: string;

  @jsonMember(String)
  public version: string;

  @jsonMember(Boolean)
  public subProject: boolean;

  @jsonMember(String)
  public description: string | null;

  @jsonMember(Date)
  public updated: Date | null;

  @jsonMember(String)
  public updatedBy: string | null;

  @jsonMember(Date)
  public created: Date;

  @jsonMember(String)
  public createdBy: string;

  @jsonArrayMember(Block)
  public blocks: Array<Block> | null;

  @jsonArrayMember(Connection)
  public connections: Array<Connection> | null;

  /**
   * Constructor.
   * @params name The name of the project.
   * @params createdBy The username/email of the creator.
   * @params description The project description. Default is null.
   * @params id is initially set to null as this will be generated from backend on save.
   */
  public constructor(name: string, createdBy: string, description: string) {
    this.id = null;
    this.name = name;
    this.version = "1.0";
    this.subProject = false;
    this.description = description;
    this.updated = null;
    this.updatedBy = null;
    this.created = new Date(new Date().toUTCString());
    this.createdBy = createdBy;
    this.blocks = [];
    this.blocks.push();
    this.connections = [];

    const rootFunction = new Block(null, this.id, new Position(150, 5), new Position(0, 0), createdBy, this.id);
    rootFunction.aspect = Aspect.Function;
    rootFunction.name = "Function";
    rootFunction.label = "Function";
    this.blocks.push(rootFunction);

    const rootProduct = new Block(null, this.id, new Position(600, 5), new Position(0, 0), createdBy, this.id);
    rootProduct.aspect = Aspect.Product;
    rootProduct.name = "Product";
    rootProduct.label = "Product";
    this.blocks.push(rootProduct);

    const rootLocation = new Block(null, this.id, new Position(1050, 5), new Position(0, 0), createdBy, this.id);
    rootLocation.aspect = Aspect.Location;
    rootLocation.name = "Location";
    rootLocation.label = "Location";
    this.blocks.push(rootLocation);
  }

  /**92
   * Convert the project to flow objects.
   * @params viewType Could be "Home" | "Tree" | "Block".
   * @params theme Current MimirorgTheme.
   * @returns A collection of converted flow nodes.
   */
  public toFlow(viewType: ViewType, theme: Theme): [FlowNode[], FlowEdge[]] {
    const flowData: [FlowNode[], FlowEdge[]] = [[], []];
    const parent = viewType === ViewType.Block ? this.getBlockSelectedAspectObject() : null;

    // Find all nodes
    let flowNodes = this.toFlowNodes(viewType, theme, parent);

    // if (parent != null && viewType === ViewType.Block) flowNodes = flowNodes.concat(parent.toFlowNode(viewType, theme, true));

    // If block view, find all selected parent terminal connectors represented as nodes
    const terminalNodes = this.toFlowParentConnectorTerminalNodes(
      viewType,
      theme,
      parent,
      flowNodes.map((x) => x.data)
    );

    flowNodes = flowNodes.concat(terminalNodes);

    // Find all edges
    const flowEdges = this.toFlowEdges(
      viewType,
      theme,
      flowNodes.map((x) => x.data)
    );

    // Find all nodes from connection handles
    const handleNodes = this.toHandleFlowNodes(
      viewType,
      theme,
      flowEdges.map((x) => x.data)
    );

    flowData[0] = flowNodes.concat(handleNodes);
    flowData[1] = flowEdges;
    return flowData;
  }

  /**
   * Get the selected aspect object if there is any.
   * @returns The selected aspect object, otherwise it returns null.
   */
  public getSelectedAspectObject(): Block | null {
    return this.blocks?.find((x) => x.selected);
  }

  /**
   * Get the block or parent selected aspect object if there is any.
   * @returns The selected aspect object, otherwise it returns null.
   */
  public getBlockSelectedAspectObject(): Block | null {
    return this.blocks?.find((x) => x.blockSelected);
  }

  /**
   * Get the selected connection if there is any.
   * @returns The selected connection, otherwise it returns null.
   */
  public getSelectedConnection(): Connection {
    return this.connections?.find((x) => x.selected);
  }

  /**
   * Delete an aspect object from project
   * @param id The id of the aspect object to delete
   */
  public deleteAspectObject(id: string): void {
    if (this.blocks == null) return;
    this.blocks = this.blocks.filter((x) => x.id !== id);
  }

  /**
   * Update the position for an aspect object, The type wil define if this is the block position
   * or the tree position.
   * @param id The id of the aspect object that should be updated
   * @param position The new position of the aspect object
   * @param type The type position to be updated
   */
  public updateAspectObjectPosition(id: string, position: Position, viewType: ViewType) {
    if (this.blocks == null || position == null)
      throw new Error("Can't update aspect object position. AspectObjects is null or position is null.");

    // Update aspect object position
    this.blocks = this.blocks.map((x) => {
      if (x.id === id) {
        if (viewType === ViewType.Tree) x.positionTree = position;
        if (viewType === ViewType.Block) x.positionBlock = position;
        return x;
      } else {
        return x;
      }
    });

    // Update handle node position
    this.connections.forEach((c) => {
      c.handles.forEach((h) => {
        if (h.id === id) {
          if (viewType === ViewType.Tree) h.positionTree = position;
          if (viewType === ViewType.Block) h.positionBlock = position;
        }
      });
    });
  }

  /**
   * Update selected status for given aspect object
   * @param id The id of the aspect object that should be updated
   * @param selected The new select value
   * @param viewType The view type "Home" | "Tree" | "Block"
   */
  public updateAspectObjectSelected(id: string, selected: boolean, viewType: ViewType): void {
    // Update Aspect object selected
    if (this.blocks != null) {
      this.blocks = this.blocks.map((x) => {
        if (x.id === id) {
          x.selected = selected;
          if (viewType === ViewType.Tree) x.blockSelected = selected;
          return x;
        } else {
          return x;
        }
      });
    }

    // Update handle node selected
    if (this.connections != null) {
      this.connections.map((c) => {
        c.handles.forEach((h) => {
          if (h.id === id) {
            h.selected = selected;
            return h;
          } else {
            return h;
          }
        });
      });
    }
  }

  /**
   * Add a new aspect object from library type
   * @param lib
   * @param positionTree
   * @param positionBlock
   * @param createdBy
   * @param viewType
   */
  public addAspectObject(
    lib: BlockLibCm,
    positionTree: Position,
    positionBlock: Position,
    createdBy: string,
    viewType: ViewType
  ) {
    const obj = new Block(lib, this.id, positionTree, positionBlock, createdBy, this.id);
    this.blocks.push(obj);

    const parent = viewType === ViewType.Block ? this.getBlockSelectedAspectObject() : this.getSelectedAspectObject();
    if (parent == null) return;

    const connectorFrom = parent.connectors.find(
      (x) => x instanceof ConnectorPartOf && x.direction === ConnectorDirection.Output
    );
    const connectorTo = obj.connectors.find((x) => x instanceof ConnectorPartOf && x.direction === ConnectorDirection.Input);
    const connection = new ConnectionPartOf(connectorFrom.outside, connectorTo.inside, this.id, this.id);
    this.connections.push(connection);
  }

  /**
   * Add a new handle to the project
   * @param handle The handle that should be added
   */
  public addHandle(handle: Handle) {
    const connection = this.connections.find((x) => x.id === handle.connection);
    if (connection == null) throw Error("Can't find any connction for handle with connection id: " + handle.connection);
    connection.addHandle(handle);
  }

  /**
   * Represent a project as a project list item
   * @returns The created project list item
   */
  public toProjectListItem(): ProjectListItem {
    const item: ProjectListItem = {
      id: this.id,
      name: this.name,
      creator: this.createdBy,
      version: this.version,
      updated: this.updated,
      description: this.description,
      selected: false,
    };
    return item;
  }

  /**
   *
   * @param id The id of the connection object that should be updated
   * @param selected The new select value
   */
  public updateConnectionSelected(id: string, selected: boolean): void {
    if (this.connections == null) return;
    let splitId = id;

    if (id.includes("#")) {
      const split = id.split("#");
      splitId = split[split.length - 1];
    }

    this.connections = this.connections.map((x) => {
      if (x.id === splitId) {
        x.selected = selected;
        return x;
      } else {
        return x;
      }
    });
  }

  /**
   *
   * @param aspectObjectId The id of the aspect object that owns the connector
   * @param id The id of the connector object that should be updated
   * @param selected The new select value
   */
  public updateConnectorSelected(aspectObjectId: string, id: string, selected: boolean): void {
    if (this.blocks == null) throw new Error("The project does not have any aspect objects");
    const actualAspectObject = this.blocks.find((x) => x.id === aspectObjectId);
    if (actualAspectObject == null) throw new Error("Can't find aspect object with id " + aspectObjectId);

    if (actualAspectObject.connectors == null)
      throw new Error("The aspect object with id" + aspectObjectId + " does not have any connectors");

    const actualConnector = actualAspectObject.connectors.find((x) => x.id === id || x.inside === id || x.outside === id);
    if (actualConnector == null) throw new Error("Can't find connector object with id " + id);

    actualConnector.selected = selected;
    actualAspectObject.updateConnector(actualConnector);
  }

  /**
   * Create a new terminal based on an existing terminal.
   * If it is not allowed to create a new terminal, an InfoException will be thrown.
   * @param aspectObjectId The parent aspect object that owns the terminal
   * @param terminalTypes A collection of all terminal types
   * @param aspectObjectTypes A collection of all aspect object types
   * @param terminalId The existing terminal id
   */
  public createTerminal(
    aspectObjectId: string,
    terminalTypes: TerminalLibCm[],
    aspectObjectTypes: BlockLibCm[],
    terminalId: string
  ): void {
    if (aspectObjectId == null || terminalTypes == null || aspectObjectTypes == null || terminalId == null)
      throw new ErrorException("Can't create terminal from null or undefined objects");

    if (this.blocks == null)
      throw new ErrorException("Can't create terminal when no aspect objects is found. The collection is null or undefined.");

    const aspectObject = this.blocks.find((x) => x.id === aspectObjectId);
    if (aspectObject == null) throw new ErrorException("Can't create terminal when aspect object is missing.");

    const existingTerminal = aspectObject.getTerminal(terminalId);
    if (existingTerminal == null) throw new ErrorException("Can't create terminal. Existing terminal is not found.");

    const aspectObjectType = aspectObjectTypes.find((x) => x.iri === aspectObject.libraryType);
    if (aspectObjectType == null) throw new ErrorException("Can't create terminal. Existing aspect object type is not found.");

    const terminalType = terminalTypes.find((x) => x.iri === existingTerminal.terminalType);
    if (terminalType == null) throw new ErrorException("Can't create terminal. The terminal type could not be found.");

    const aspectObjectTerminalType = aspectObjectType.blockTerminals.find(
      (x) => x.terminal.id === terminalType.id && x.connectorDirection === existingTerminal.direction
    );
    if (aspectObjectTerminalType == null)
      throw new ErrorException("Can't create terminal. The aspect object terminal type could not be found.");

    aspectObject.createTerminal(aspectObjectTerminalType, existingTerminal.direction);
  }

  /**
   * Delete a terminal from an aspect object.
   * If it is not allowed to remove new terminal, an InfoException will be thrown.
   * @param aspectObjectId The parent aspect object that owns the terminal
   * @param terminalTypes A collection of all terminal types
   * @param aspectObjectTypes A collection of all aspect object types
   * @param terminalId The existing terminal id
   */
  public deleteTerminal(
    aspectObjectId: string,
    terminalTypes: TerminalLibCm[],
    aspectObjectTypes: BlockLibCm[],
    terminalId: string
  ): void {
    if (aspectObjectId == null || terminalTypes == null || aspectObjectTypes == null || terminalId == null)
      throw new ErrorException("Can't delete terminal from null or undefined objects");

    if (this.blocks == null)
      throw new ErrorException("Can't delete terminal when no aspect objects is found. The collection is null or undefined.");

    const aspectObject = this.blocks.find((x) => x.id === aspectObjectId);
    if (aspectObject == null) throw new ErrorException("Can't delete terminal when aspect object is missing.");

    const existingTerminal = aspectObject.getTerminal(terminalId);
    if (existingTerminal == null) throw new ErrorException("Can't delete terminal. Existing terminal is not found.");

    const aspectObjectType = aspectObjectTypes.find((x) => x.iri === aspectObject.libraryType);
    if (aspectObjectType == null) throw new ErrorException("Can't delete terminal. Existing aspect object type is not found.");

    const terminalType = terminalTypes.find((x) => x.iri === existingTerminal.terminalType);
    if (terminalType == null) throw new ErrorException("Can't delete terminal. The terminal type could not be found.");

    const aspectObjectTerminalType = aspectObjectType.blockTerminals.find(
      (x) => x.terminal.id === terminalType.id && x.connectorDirection === existingTerminal.direction
    );
    if (aspectObjectTerminalType == null)
      throw new ErrorException("Can't delete terminal. The aspect object terminal type could not be found.");

    aspectObject.deleteTerminal(aspectObjectTerminalType, existingTerminal.id, this.connections);
  }

  /**
   * Delete a connection object from project
   * @param id The id of the connection object to delete
   */
  public deleteConnection(id: string): void {
    if (this.connections == null) return;

    if (this.connections == null) return;
    let splitId = id;

    if (id.includes("#")) {
      const split = id.split("#");
      splitId = split[split.length - 1];
    }
    this.connections = this.connections.filter((x) => x.id !== splitId);
  }

  /**
   * Convert a flow edge or a flow connection to a mimirorg connection. If connector is not found, null is returned.
   * @param edge The edge that should be converted
   * @param mainProject Main project id
   * @returns The created connection
   */
  public convertFromFlowEdge(edge: FlowConnection | FlowEdge, mainProject: string | null): Connection | null {
    const actualFromConnector = this.getConnector(edge.sourceHandle);
    const actualToConnector = this.getConnector(edge.targetHandle);

    if (actualFromConnector == null || actualToConnector == null) return null;

    if (actualFromConnector instanceof ConnectorTerminal)
      return new ConnectionTerminal(edge.sourceHandle, edge.targetHandle, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorPartOf)
      return new ConnectionPartOf(edge.sourceHandle, edge.targetHandle, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorFulfilledBy)
      return new ConnectionFulfilledBy(edge.sourceHandle, edge.targetHandle, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorHasLocation)
      return new ConnectionHasLocation(edge.sourceHandle, edge.targetHandle, this.id, mainProject);
  }

  /**
   * Get all siblings for given aspect object
   * @param aspectObject
   * @returns A collection of sibling aspect objects
   */
  public getSiblingAspectNodes(aspectObject: string): Block[] {
    // TODO: Implement this if it should be used
    return [];
  }

  /**
   * Get the reference designation for an aspect object.
   * @params aspectObject The aspect object identificator.
   * @returns A reference string, otherwise it returns null.
   */
  public getReferenceDesignation(aspectObject: string): string {
    if (aspectObject == null) throw new Error("Can't find an aspect object when param is null.");

    const obj = this.blocks.find((x) => x.id === aspectObject);
    if (obj == null) throw new Error("Can't find aspect object with id " + aspectObject);

    const refs: string[] = [];
    let nextNode = obj;

    while (nextNode != null) {
      if (nextNode.rds != null) refs.push(nextNode.getRdsId());
      nextNode = this.getParentAspectObject(nextNode?.id ?? "");
    }

    refs.push(`<${this.name.toUpperCase()}>`);
    return refs.reverse().join("");
  }

  /**
   * Check if an Aspect Object has children.
   * @params aspectObject The aspect object identificator.
   * @returns True if aspect object has children.
   */
  public hasChildren(aspectObject: string): boolean {
    if (aspectObject == null) throw new Error("Can't check if an aspect object has children when param is null.");

    const obj = this.blocks.find((x) => x.id === aspectObject);
    if (obj == null) throw new Error("Can't find aspect object with id " + aspectObject);

    const outConnector = obj.connectors.find((x) => x instanceof ConnectorPartOf && x.direction === ConnectorDirection.Output);
    if (outConnector == null) throw new Error("Missing output partof connector on node with id " + aspectObject);

    return this.connections.some((x) => x instanceof ConnectionPartOf && x.fromConnector === outConnector.id);
  }

  /**
   * Get source Aspect object and targhet aspect object from a connection
   * @param connection The connection to find aspect objects from
   * @returns A tupple with from object and to object. Obejects is null if not found.
   */
  public getConnectionAspectObjects(connection: Connection): [from: Block | null, to: Block | null] {
    if (connection == null) throw new Error("Can't find aspect objects for connection. The connection is null or undefined.");
    const fromObject = this.blocks?.find((x) => x.hasConnector(connection.fromConnector)) ?? null;
    const toObject = this.blocks?.find((x) => x.hasConnector(connection.toConnector)) ?? null;
    return [fromObject, toObject];
  }

  /**
   * Get a connector from connector id.
   * @param connector Connector id
   * @returns Connector if found, otherwise it returns null
   */
  public getConnector(connector: string): Connector | null {
    if (this.blocks == null) return null;

    for (let i = 0; i < this.blocks.length; i++) {
      const actualConnector = this.blocks[i].getConnector(connector);
      if (actualConnector != null) return actualConnector;
    }
    return null;
  }

  /**
   * Check if there is any selected aspect objects.
   * @returns true if any selected
   */
  public hasSelectedAspectObjects(): boolean {
    if (this.blocks == null) return false;
    return this.blocks.some((x) => x.selected);
  }

  //#region Private functions

  /**
   * Convert aspect objects to flow nodes. If parent is different from null,
   * only direct children will be returned.
   * @params viewType Could be "Home" | "Tree" | "block.
   * @params theme Current MimirorgTheme.
   * @params parent Parent aspect object.
   * @returns A collection of converted flow nodes.
   */
  private toFlowNodes(viewType: ViewType, theme: Theme, parent: Block): FlowNode[] {
    if (this.blocks == null) return [];
    return parent != null
      ? this.getChildrenAspectObject(parent.id).map((x) => x.toFlowNode(viewType, theme, false))
      : this.blocks.map((x) => x.toFlowNode(viewType, theme, false));
  }

  /**
   * Represent parent active connectors as flow nodes with connector.
   * @params viewType Could be "Home" | "Tree" | "block.
   * @params theme Current MimirorgTheme.
   * @params parent Parent aspect object.
   * @params siblings All other siblings sending to flow.
   * @returns A collection of converted flow nodes.
   */
  private toFlowParentConnectorTerminalNodes(viewType: ViewType, theme: Theme, parent: Block, siblings: Block[]): FlowNode[] {
    if (viewType !== ViewType.Block || parent == null || parent.connectors == null) return [];
    const minMax = this.getMinMax(siblings);

    const activeParentConnectors = parent.getTerminals().filter((x) => x.selected);
    let inputIndex = 0;
    let outputIndex = 0;

    const flowNodes: FlowNode[] = [];

    activeParentConnectors.forEach((x) => {
      if (x.direction === ConnectorDirection.Input) {
        flowNodes.push(x.toFlowNode(viewType, theme, minMax[0], minMax[1], inputIndex));
        inputIndex++;
      } else {
        flowNodes.push(x.toFlowNode(viewType, theme, minMax[0], minMax[1], outputIndex));
        outputIndex++;
      }
    });
    return flowNodes;
  }

  /**
   * Get minimum and maximum x position in aspect object array
   * @param siblings The searchable collection of aspect objects
   * @returns A tuple with minimum and maximum value of position x
   */
  private getMinMax(siblings: Block[]): [min: number, max: number] {
    const min =
      (siblings.length &&
        siblings.reduce(function (prev, curr) {
          return prev.positionBlock.posX < curr.positionBlock.posX ? prev : curr;
        })) ||
      null;

    const max =
      (siblings.length &&
        siblings.reduce(function (prev, curr) {
          return prev.positionBlock.posX > curr.positionBlock.posX ? prev : curr;
        })) ||
      null;

    return [min?.positionBlock?.posX ?? 10, max?.positionBlock?.posX ?? 10];
  }

  /**
   * Convert connection handles to flow nodes.
   * @params viewType Could be "Home" | "Tree" | "block.
   * @params theme Current MimirorgTheme.
   * @params connections Find handles for children connections.
   * @returns A collection of converted flow nodes.
   */
  private toHandleFlowNodes(viewType: ViewType, theme: Theme, connections: Connection[]): FlowNode[] {
    if (this.connections == null) return [];
    if (viewType !== ViewType.Block) return [];

    let handles: FlowNode[] = [];

    connections.forEach((connection) => {
      if (connection.handles != null) {
        handles = handles.concat(connection.handles.map((x) => x.toFlowNode(viewType, theme)));
      }
    });

    return handles;
  }

  /**
   * Convert connections to flow edges.
   * @params type Usage type. Could be Block or Tree.
   * @params theme Current MimirorgTheme.
   * @params children Children aspect object of parent.
   * @returns A collection of converted flow edges.
   */
  private toFlowEdges(viewType: ViewType, theme: Theme, children: Block[]): FlowEdge[] {
    if (this.connections == null) return [];
    let edges: FlowEdge<Connection>[] = [];

    switch (viewType) {
      case ViewType.Tree:
        this.connections.forEach((x) => {
          const [from, to] = this.getConnectionAspectObjects(x);
          const e = x.toFlowEdge(viewType, from, to, theme);
          edges = edges.concat(e);
        });
        return edges;
      case ViewType.Block:
        this.connections.forEach((x) => {
          const [from, to] = this.getConnectionAspectObjects(x);
          if (children.some((ao) => ao.id === from.id || ao.id === to.id)) {
            const e = x.toFlowEdge(viewType, from, to, theme);
            edges = edges.concat(e);
          }
        });
        return edges;
      case ViewType.Home:
        return [];
    }
  }

  /**
   * Get the parent connection from an Aspect Object.
   * @params aspectObject the aspect object identificator.
   * @returns Connection if exist, otherwise it returns null.
   */
  private getParentConnection(aspectObject: string): Connection | null {
    if (aspectObject == null) return null;

    const obj = this.blocks.find((x) => x.id === aspectObject);
    if (obj == null) return null;

    const inConnector = obj.connectors.find((x) => x instanceof ConnectorPartOf && x.direction === ConnectorDirection.Input);
    if (inConnector == null) return null;

    return this.connections.find(
      (x) =>
        x instanceof ConnectionPartOf &&
        (x.toConnector === inConnector.id || x.toConnector === inConnector.inside || x.toConnector === inConnector.outside)
    );
  }

  /**
   * Get the parent aspect object from a child Aspect Object.
   * @params aspectObject The aspect object identificator.
   * @returns aspect Parent object if exist, otherwise it returns null.
   */
  private getParentAspectObject(aspectObject: string): Block | null {
    if (aspectObject == null) throw new Error("Can't find an aspect object when param is null.");

    const parentConnection = this.getParentConnection(aspectObject);
    if (parentConnection == null) return null;

    const [from] = this.getConnectionAspectObjects(parentConnection);
    return from;
  }

  /**
   * Get all children for a given Aspect Object.
   * @params aspectObject The aspect object identificator.
   * @returns A collection of aspect objects that is child of given parent.
   */
  private getChildrenAspectObject(aspectObject: string): Block[] {
    if (aspectObject == null) throw new Error("Can't find an aspect object when param is null.");

    const children = this.blocks.filter((x) => {
      const parent = this.getParentAspectObject(x.id);
      return parent != null && parent.id === aspectObject;
    });
    return children != null ? children : [];
  }

  //#endregion
}
