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
} from ".";
import { Connection as FlowConnection, Edge as FlowEdge, Node as FlowNode } from "react-flow-renderer";
import { ConnectorDirection } from "../enums/Direction";
import { jsonArrayMember, jsonMember, jsonObject } from "typedjson";
import { CreateId } from "components/flow/helpers";

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
    this.connections = [];
  }

  /**
   * Convert aspect objects to flow nodes.
   * @params type Usage type. Could be block or tree.
   * @params parent Set parent id if you want to only convert direct children of an aspect object. The collection will also include the parent aspect object.
   * @returns A collection of converted flow nodes.
   */
  public toFlowNodes(type: "Block" | "Tree", parent?: string): FlowNode[] {
    if (this.aspectObjects == null) return [];
    if (parent == null) {
      return this.aspectObjects.map((x) => x.convertToFlowNode(type));
    } else {
      const parentObject = this.aspectObjects.find((x) => x.id === parent);
      if (parentObject == null) return [];

      const children = this.getChildrenAspectObject(parent);
      children.unshift(parentObject);

      return children.map((x) => x.convertToFlowNode(type));
    }
  }

  /**
   * Convert connections to flow edges.
   * @params type Usage type. Could be Block or Tree.
   * @returns A collection of converted flow edges.
   */
  public toFlowEdges(type: "Block" | "Tree"): FlowEdge[] {
    if (this.connections == null) return [];
    return this.connections.map((x) => {
      const [from, to] = this.getConnectionNodes(x);
      return x.toFlowEdge(type, from.id, to.id);
    });
  }

  public convertFromFlowEdge(edge: FlowConnection | FlowEdge, mainProject: string | null): Connection | null {
    const actualFromConnector = this.getConnector(edge.source);
    if (actualFromConnector == null) return null;

    if (actualFromConnector instanceof ConnectorTerminal)
      return new ConnectionTerminal(edge.source, edge.target, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorPartOf)
      return new ConnectionPartOf(edge.source, edge.target, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorFulfilledBy)
      return new ConnectionFulfilledBy(edge.source, edge.target, this.id, mainProject);

    if (actualFromConnector instanceof ConnectorHasLocation)
      return new ConnectionHasLocation(edge.source, edge.target, this.id, mainProject);
  }

  public getSelectedAspectObject(): AspectObject | null {
    return this.aspectObjects.find((x) => x.selected);
  }

  public selectedConnection(): Connection {
    return this.connections.find((x) => x.selected);
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
