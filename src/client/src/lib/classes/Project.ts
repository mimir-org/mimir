/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AspectObject,
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
  ConnectorRelation,
  Position,
} from ".";
import { Connection as FlowConnection, Edge as FlowEdge, Node as FlowNode } from "react-flow-renderer";
import { ConnectorDirection } from "../enums/Direction";
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { CreateId } from "components/flow/helpers";
import { ProjectListItem } from "../interfaces/ProjectListItem";
import { AspectObjectLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { Aspect } from "lib/enums";
import { ViewType } from "../enums/ViewType";

@jsonObject({
  knownTypes: [ConnectionTerminal, ConnectionRelation, ConnectionFulfilledBy, ConnectionHasLocation, ConnectionPartOf],
})
export class Project {
  // Domain members
  @jsonMember(String)
  public id: string;

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

  @jsonArrayMember(AspectObject)
  public aspectObjects: Array<AspectObject> | null;

  @jsonArrayMember(Connection)
  public connections: Array<Connection> | null;

  /**
   * Constructor.
   * @params name The name of the project.
   * @params createdBy The username/email of the creator.
   * @params description The project description. Default is null.
   */
  public constructor(name: string, createdBy: string, description: string = null) {
    this.id = CreateId();
    this.name = name;
    this.version = "1.0";
    this.subProject = false;
    this.description = description;
    this.updated = null;
    this.updatedBy = null;
    this.created = new Date(new Date().toUTCString());
    this.createdBy = createdBy;
    this.aspectObjects = [];
    this.aspectObjects.push();
    this.connections = [];

    const rootFunction = new AspectObject(
      null,
      this.id,
      new Position(150, 5),
      new Position(0, 0),
      "reidar.liabo@bouvet.no",
      this.id
    );
    rootFunction.aspect = Aspect.Function;
    rootFunction.name = "Function";
    rootFunction.label = "Function";
    this.aspectObjects.push(rootFunction);

    const rootProduct = new AspectObject(
      null,
      this.id,
      new Position(600, 5),
      new Position(0, 0),
      "reidar.liabo@bouvet.no",
      this.id
    );
    rootProduct.aspect = Aspect.Product;
    rootProduct.name = "Product";
    rootProduct.label = "Product";
    this.aspectObjects.push(rootProduct);

    const rootLocation = new AspectObject(
      null,
      this.id,
      new Position(1050, 5),
      new Position(0, 0),
      "reidar.liabo@bouvet.no",
      this.id
    );
    rootLocation.aspect = Aspect.Location;
    rootLocation.name = "Location";
    rootLocation.label = "Location";
    this.aspectObjects.push(rootLocation);
  }

  /**
   * Delete an aspect object from project
   * @param id The id of the aspect object to delete
   */
  public deleteAspectObject(id: string): void {
    if (this.aspectObjects == null) return;
    this.aspectObjects = this.aspectObjects.filter((x) => x.id !== id);
  }

  /**
   * Update the position for an aspect object, The type wil define if this is the block position
   * or the tree position.
   * @param id The id of the aspect object that should be updated
   * @param position The new position of the aspect object
   * @param type The type position to be updated
   */
  public updateAspectObjectPosition(id: string, position: Position, viewType: ViewType) {
    if (this.aspectObjects == null || position == null)
      throw new Error("Can't update aspect object position. AspectObjects is null or position is null.");

    this.aspectObjects = this.aspectObjects.map((x) => {
      if (x.id === id) {
        if (viewType === ViewType.Tree) x.positionTree = position;
        if (viewType === ViewType.Block) x.positionBlock = position;
        return x;
      } else {
        return x;
      }
    });
  }

  /**
   *
   * @param id The id of the aspect object that should be updated
   * @param selected The new select value
   */
  public updateAspectObjectSelected(id: string, selected: boolean, viewType: ViewType): void {
    if (this.aspectObjects == null) return;
    this.aspectObjects = this.aspectObjects.map((x) => {
      if (x.id === id) {
        x.selected = selected;
        if (viewType === ViewType.Tree) x.blockSelected = selected;
        return x;
      } else {
        return x;
      }
    });
  }

  public updateAspectObject(aspectObject: AspectObject) {
    this.aspectObjects = this.aspectObjects.map((x) => (x.id === aspectObject.id ? aspectObject : x));
  }

  public addAspectObject(lib: AspectObjectLibCm, positionTree: Position, positionBlock: Position, createdBy: string) {
    const obj = new AspectObject(lib, this.id, positionTree, positionBlock, createdBy, this.id);
    this.aspectObjects.push(obj);
  }

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
   * Convert aspect objects to flow nodes.
   * @params type Usage type. Could be block or tree.
   * @returns A collection of converted flow nodes.
   */
  public toFlowNodes(viewType: ViewType): FlowNode[] {
    if (this.aspectObjects == null) return [];
    const parent = viewType === ViewType.Block ? this.getBlockSelectedAspectObject() : null;

    if (parent == null) {
      return this.aspectObjects.map((x) => x.toFlowNode(viewType));
    } else {
      const objects = this.getChildrenAspectObject(parent.id).map((x) => x.toFlowNode(viewType));
      return objects;
    }
  }

  /**
   * Convert connections to flow edges.
   * @params type Usage type. Could be Block or Tree.
   * @returns A collection of converted flow edges.
   */
  public toFlowEdges(viewType: ViewType): FlowEdge[] {
    if (this.connections == null) return [];
    return this.connections.map((x) => {
      const [from, to] = this.getConnectionNodes(x);
      return x.toFlowEdge(viewType, from.id, to.id);
    });
  }

  /**
   *
   * @param id The id of the connection object that should be updated
   * @param selected The new select value
   */
  public updateConnectionSelected(id: string, selected: boolean): void {
    if (this.connections == null) return;
    this.connections = this.connections.map((x) => {
      if (x.id === id) {
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
    if (this.aspectObjects == null) throw new Error("The project does not have any aspect objects");
    const actualAspectObject = this.aspectObjects.find((x) => x.id === aspectObjectId);
    if (actualAspectObject == null) throw new Error("Can't find aspect object with id " + aspectObjectId);

    if (actualAspectObject.connectors == null)
      throw new Error("The aspect object with id" + aspectObjectId + " does not have any connectors");

    const actualConnector = actualAspectObject.connectors.find((x) => x.id === id);
    if (actualConnector == null) throw new Error("Can't find connector object with id " + id);

    actualConnector.selected = selected;
    actualAspectObject.updateConnector(actualConnector);
  }

  /**
   * Create a new terminal based on an existing terminal.
   * If it is not allowed to create a new terminal, nothing will be created.
   * @param aspectObjectId The parent aspect object that owns the terminal
   * @param terminalTypes A collection of all terminal types
   * @param terminalId The existing terminal id
   */
  public createTerminal(aspectObjectId: string, terminalTypes: TerminalLibCm[], terminalId: string): void {
    if (aspectObjectId == null || terminalTypes == null || terminalId == null)
      throw new Error("Can't create terminal from null or undefined objects");

    if (this.aspectObjects == null)
      throw new Error("Can't create terminal when no aspect objects is found. The collection is null or undefined.");

    const aspectObject = this.aspectObjects.find((x) => x.id === aspectObjectId);
    if (aspectObject == null) throw new Error("Can't create terminal when aspect object is missing.");

    const existingTerminal = aspectObject.getTerminal(terminalId);
    if (existingTerminal == null) throw new Error("Can't create terminal. Existing terminal is not found.");

    const terminalType = terminalTypes.find((x) => x.iri === existingTerminal.terminalType);
    if (terminalType == null) throw new Error("Can't create terminal. The terminal type could not be found.");

    aspectObject.createTerminal(terminalType, existingTerminal.direction);
  }

  /**
   * Delete a connection object from project
   * @param id The id of the connection object to delete
   */
  public deleteConnection(id: string): void {
    if (this.connections == null) return;
    this.connections = this.connections.filter((x) => x.id !== id);
  }

  public convertFromFlowEdge(edge: FlowConnection | FlowEdge, mainProject: string | null): Connection | null {
    const actualFromConnector = this.getConnector(edge.sourceHandle);
    if (actualFromConnector == null) return null;

    if (actualFromConnector instanceof ConnectorTerminal)
      return new ConnectionTerminal(edge.sourceHandle, edge.targetHandle, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorPartOf)
      return new ConnectionPartOf(edge.sourceHandle, edge.targetHandle, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorFulfilledBy)
      return new ConnectionFulfilledBy(edge.sourceHandle, edge.targetHandle, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorHasLocation)
      return new ConnectionHasLocation(edge.sourceHandle, edge.targetHandle, this.id, mainProject);
  }

  public getSelectedAspectObject(): AspectObject | null {
    return this.aspectObjects?.find((x) => x.selected);
  }

  public getBlockSelectedAspectObject(): AspectObject | null {
    return this.aspectObjects?.find((x) => x.blockSelected);
  }

  public getSelectedConnection(): Connection {
    return this.connections?.find((x) => x.selected);
  }

  public getSiblingAspectNodes(parent: string): AspectObject[] {
    return [];
  }

  /**
   * Get the reference designation for an aspect object.
   * @params aspectObject the aspect object identificator.
   * @returns a reference string, otherwise it returns null.
   */
  public getReferenceDesignation(aspectObject: string): string {
    if (aspectObject == null) throw new Error("Can't find an aspect object when param is null.");

    const obj = this.aspectObjects.find((x) => x.id === aspectObject);
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
   * Get all children for a given Aspect Object.
   * @params aspectObject the aspect object identificator.
   * @returns a collection of aspect objects that is child of given parent.
   */
  public getChildrenAspectObject(aspectObject: string): AspectObject[] {
    if (aspectObject == null) throw new Error("Can't find an aspect object when param is null.");

    const children = this.aspectObjects.filter((x) => {
      const parent = this.getParentAspectObject(x.id);
      return parent != null && parent.id === aspectObject;
    });
    return children != null ? children : [];
  }

  /**
   * Get the parent aspect object from a child Aspect Object.
   * @params aspectObject the aspect object identificator.
   * @returns aspect parent object if exist, otherwise it returns null.
   */
  public getParentAspectObject(aspectObject: string): AspectObject | null {
    if (aspectObject == null) throw new Error("Can't find an aspect object when param is null.");

    const parentConnection = this.getParentConnection(aspectObject);
    if (parentConnection == null) return null;

    const [from] = this.getConnectionNodes(parentConnection);
    return from;
  }

  /**
   * Get the parent connection from an Aspect Object.
   * @params aspectObject the aspect object identificator.
   * @returns connection if exist, otherwise it returns null.
   */
  public getParentConnection(aspectObject: string): Connection | null {
    if (aspectObject == null) return null;

    const obj = this.aspectObjects.find((x) => x.id === aspectObject);
    if (obj == null) return null;

    const inConnector = obj.connectors.find((x) => x instanceof ConnectorPartOf && x.direction === ConnectorDirection.Input);
    if (inConnector == null) return null;

    return this.connections.find((x) => x instanceof ConnectionPartOf && x.toConnector === inConnector.id);
  }

  /**
   * Get all children connections from an Aspect Object.
   * @params aspectObject the aspect object identificator.
   * @returns a collection of connections or empty if not exist.
   */
  public getChildrenConnections(aspectObject: string): Connection[] {
    if (aspectObject == null) throw new Error("Can't find an aspect object when param is null.");

    const obj = this.aspectObjects.find((x) => x.id === aspectObject);
    if (obj == null) throw new Error("Can't find aspect object with id " + aspectObject);

    const outConnector = obj.connectors.find((x) => x instanceof ConnectorPartOf && x.direction === ConnectorDirection.Output);
    if (outConnector == null) throw new Error("Missing output partof connector on node with id " + aspectObject);

    return this.connections.filter((x) => x instanceof ConnectionPartOf && x.fromConnector === outConnector.id);
  }

  /**
   * Check if an Aspect Object has children.
   * @params aspectObject the aspect object identificator.
   * @returns true if aspect object has children.
   */
  public hasChildren(aspectObject: string): boolean {
    if (aspectObject == null) throw new Error("Can't check if an aspect object has children when param is null.");

    const obj = this.aspectObjects.find((x) => x.id === aspectObject);
    if (obj == null) throw new Error("Can't find aspect object with id " + aspectObject);

    const outConnector = obj.connectors.find((x) => x instanceof ConnectorPartOf && x.direction === ConnectorDirection.Output);
    if (outConnector == null) throw new Error("Missing output partof connector on node with id " + aspectObject);

    return this.connections.some((x) => x instanceof ConnectionPartOf && x.fromConnector === outConnector.id);
  }

  public getConnectionNodes(connection: Connection): [from: AspectObject | null, to: AspectObject | null] {
    if (connection == null) return [null, null];
    const fromObject = this.aspectObjects?.find((x) => x.hasConnector(connection.fromConnector)) ?? null;
    const toObject = this.aspectObjects?.find((x) => x.hasConnector(connection.toConnector)) ?? null;
    return [fromObject, toObject];
  }

  public getConnectorNodes(fromConnector: string, toConnector: string): [from: AspectObject | null, to: AspectObject | null] {
    if (fromConnector == null || toConnector == null) return [null, null];
    const fromObject = this.aspectObjects?.find((x) => x.hasConnector(fromConnector)) ?? null;
    const toObject = this.aspectObjects?.find((x) => x.hasConnector(toConnector)) ?? null;
    return [fromObject, toObject];
  }

  public getConnection(fromConnector: string, toConnector: string): Connection {
    return this.connections.find((x) => x.fromConnector === fromConnector && x.toConnector === toConnector);
  }

  public getConnector(connector: string): Connector | null {
    if (this.aspectObjects == null) return null;

    for (let i = 0; i < this.aspectObjects.length; i++) {
      const actualConnector = this.aspectObjects[i].getConnector(connector);
      if (actualConnector != null) return actualConnector;
    }
    return null;
  }

  public hasSelectedAspectObjects(): boolean {
    if (this.aspectObjects == null) return false;
    return this.aspectObjects.some((x) => x.selected);
  }
}

// export class MimirProject implements ProjectCm {
//   id: string;
//   iri: string;
//   domain: string;
//   isSubProject: boolean;
//   version: string;
//   name: string;
//   description: string;
//   updatedBy: string;
//   projectOwner: string;
//   updated: Date;
//   nodes: MimirNode[];
//   edges: MimirEdge[];

//   constructor(project: Partial<Project>) {
//     this.id = project?.id ?? null;
//     this.iri = project?.iri ?? null;
//     this.domain = project?.domain ?? null;
//     this.isSubProject = project?.isSubProject ?? false;
//     this.version = project?.version ?? null;
//     this.name = project?.name ?? null;
//     this.description = project?.description ?? "";
//     this.projectOwner = project?.projectOwner ?? "";
//     this.updatedBy = project?.updatedBy ?? null;
//     this.updated = project?.updated ?? null;
//     this.nodes = project?.nodes?.map((node) => new MimirNode(node)) ?? null;
//     this.edges = project?.edges?.map((edge) => new MimirEdge(edge)) ?? null;
//   }

//   public nodeHasChildren(node: MimirNode, edges: MimirEdge[]) {
//     return !!this.findChildrenEdge(node, edges);
//   }

//   public findChildrenEdge(node: MimirNode, edges: MimirEdge[]) {
//     return edges.find((edge) => edge.fromNodeId === node.id && edge.fromConnector instanceof ConnectorPartOf);
//   }

//   public isAncestorInSet(currentNode: MimirNode, set: Set<string>, edges: MimirEdge[]): boolean {
//     const edge = this.findParentEdge(currentNode.id, edges);
//     if (!edge) return false;

//     const parentNode = edge.fromNode as MimirNode;
//     if (set.has(parentNode.id)) return true;

//     return this.isAncestorInSet(parentNode, set, edges);
//   }

//   public findParentNode(currentNode: MimirNode) {
//     if (!currentNode || currentNode.isAspectNode()) return null;
//     return this.findParentEdge(currentNode.id, this.edges)?.fromNode as MimirNode;
//   }

//   public findParentEdge(nodeId: string, edges: Edge[]): Edge {
//     return edges.find((edge) => edge.toNodeId === nodeId && edge.fromConnector instanceof ConnectorPartOf);
//   }

//   public buildFlowTreeNodes() {
//     const flowNodes: FlowNode[] = [];

//     this.nodes.forEach((node) => {
//       const treeNode = node.convertToFlowNode();
//       if (treeNode) flowNodes.push(treeNode);
//     });

//     return flowNodes;
//   }

//   public buildFlowTreeConnections(filter: VisualFilterData, onEdgeSplitClick: (id: string, x: number, y: number) => void) {
//     const flowEdges: FlowEdge[] = [];

//     this.edges.forEach((edge) => {
//       const treeEdge = edge.toFlowEdge(this.nodes, filter, onEdgeSplitClick);
//       if (treeEdge) flowEdges.push(treeEdge);
//     });

//     return flowEdges;
//   }

//   public getAspectAttributeMap() {
//     const map: { [attributeId: string]: { nodeId: string } } = {};

//     this.nodes.forEach((aspect) =>
//       aspect.attributes?.forEach((attribute) => {
//         map[attribute.id] = { nodeId: aspect.id };
//       })
//     );
//     return map;
//   }

//   /*
//   public getNodeConnectorAttributeMap() {
//     const map: { [attributeId: string]: { nodeId: string; terminalId: string } } = {};

//     this.nodes.forEach((n) =>
//       n.connectors?.forEach((c) => {
//         if (!IsTerminal(c)) return;
//         c.attributes?.forEach((a) => {
//           map[a.id] = {
//             nodeId: n.id,
//             terminalId: c.id,
//           };
//         });
//       })
//     );
//     return map;
//   }
// */

//   public toJson() {
//     return JSON.stringify(this);
//   }
// }
