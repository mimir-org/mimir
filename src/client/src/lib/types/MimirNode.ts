import { Aspect, Attribute, Connector, Edge, Node, NodeType, TypeReference } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../../components/flow/helpers/Connectors";
import { MimirEdge } from "./MimirEdge";

/**
 * @interface
 * @extends Node
 * @property {string} id - The id of the node.
 * @property {string} iri - The iri of the node.
 * @property {string} domain - The domain of the node.
 * @property {string} kind - The kind of the node.
 * @property {string} rds - The rds of the node.
 * @property {string} description - The description of the node.
 * @property {TypeReference[]} typeReferences - The type references of the node.
 * @property {string} name - The name of the node.
 * @property {string} label - The label of the node.
 * @property {number} positionX - The position x of the node.
 * @property {number} positionY - The position y of the node.
 * @property {boolean} isLocked - The is locked of the node.
 * @property {string} isLockedStatusBy - The is locked status by of the node.
 * @property {Date} isLockedStatusDate - The is locked status date of the node.
 * @property {number} positionBlockX - The position block x of the node.
 * @property {number} positionBlockY - The position block y of the node.
 * @property {number} level - The level of the node.
 * @property {number} order - The order of the node.
 * @property {string} updatedBy - The updated by of the node.
 * @property {Date} updated - The updated of the node.
 * @property {Date} created - The created of the node.
 * @property {string} createdBy - The created by of the node.
 * @property {string} libraryTypeId - The library type id of the node.
 * @property {string} version - The version of the node.
 * @property {Aspect} aspect - The aspect of the node.
 * @property {NodeType} nodeType - The node type of the node.
 * @property {string} masterProjectId - The master project id of the node.
 * @property {string} masterProjectIri - The master project iri of the node.
 * @property {string} symbol - The symbol of the node.
 * @property {string} purposeString - The purpose string of the node.
 * @property {Connector[]} connectors - The connectors of the node.
 * @property {Attribute[]} attributes - The attributes of the node.
 * @property {string} projectId - The project id of the node.
 * @property {string} projectIri - The project iri of the node.
 * @property {number} width - The width of the node.
 * @property {number} height - The height of the node.
 * @property {boolean} selected - The selected of the node.
 * @property {boolean} blockSelected - The block selected of the node.
 */
export interface IMimirNode extends Node {
  id: string;
  iri: string;
  domain: string;
  kind: string;
  rds: string;
  description: string;
  typeReferences: TypeReference[];
  name: string;
  label: string;
  positionX: number;
  positionY: number;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
  positionBlockX: number;
  positionBlockY: number;
  level: number;
  order: number;
  updatedBy: string;
  updated: Date;
  created: Date;
  createdBy: string;
  libraryTypeId: string;
  version: string;
  aspect: Aspect;
  nodeType: NodeType;
  masterProjectId: string;
  masterProjectIri: string;
  symbol: string;
  purposeString: string;
  connectors: Connector[];
  attributes: Attribute[];
  projectId: string;
  projectIri: string;
  width: number;
  height: number;
  hidden: boolean;
  blockHidden: boolean;
  selected: boolean;
  blockSelected: boolean;

  /** @returns Returns the parent edge of the node */
  findParentEdge(nodeId: string, edges: Edge[]): Edge;

  /** @returns Returns the child edge of the node */
  findChildrenEdge(edges: Edge[]): Edge;

  /** @returns Returns true if the node has children */
  hasChildren(edges: Edge[]): boolean;

  /** @returns Returns true if the node is an ancestor in the set */
  isAncestorInSet(currentNode: MimirNode, set: Set<string>, edges: Edge[]): boolean;

  /** @returns Returns the parent node of the current node */
  findParentNode(node: MimirNode, edges: Edge[]): MimirNode;

  /** @returns Returns true if the node is an aspect node, can be called on a node or a with a node as parameter */
  isAspectNode(MimirNode?): boolean;

  /** @returns Returns true if the node is a location node */
  isLocation(): boolean;

  /** @returns Returns true if the node is a product node */
  isProduct(): boolean;

  /** @returns Returns true if the node is a function node */
  isFunction(): boolean;

  /** @returns Returns a node object */
  toNode(): Node;
}

export class MimirNode implements Node {
  id: string;
  iri: string;
  domain: string;
  kind: string;
  rds: string;
  description: string;
  typeReferences: TypeReference[];
  name: string;
  label: string;
  positionX: number;
  positionY: number;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
  positionBlockX: number;
  positionBlockY: number;
  level: number;
  order: number;
  updatedBy: string;
  updated: Date;
  created: Date;
  createdBy: string;
  libraryTypeId: string;
  version: string;
  aspect: Aspect;
  nodeType: NodeType;
  masterProjectId: string;
  masterProjectIri: string;
  symbol: string;
  purposeString: string;
  connectors: Connector[];
  attributes: Attribute[];
  projectId: string;
  projectIri: string;
  width: number;
  height: number;
  hidden: boolean;
  blockHidden: boolean;
  selected: boolean;
  blockSelected: boolean;

  constructor(node: Node) {
    this.id = node.id;
    this.iri = node.iri;
    this.domain = node.domain;
    this.kind = node.kind;
    this.rds = node.rds;
    this.description = node.description ? node.description : "";
    this.typeReferences = node.typeReferences;
    this.name = node.name;
    this.label = node.label;
    this.positionX = node.positionX;
    this.positionY = node.positionY;
    this.isLocked = node.isLocked;
    this.isLockedStatusBy = node.isLockedStatusBy;
    this.isLockedStatusDate = node.isLockedStatusDate;
    this.positionBlockX = node.positionBlockX;
    this.positionBlockY = node.positionBlockY;
    this.level = node.level;
    this.order = node.order;
    this.updatedBy = node.updatedBy;
    this.updated = node.updated;
    this.created = node.created;
    this.createdBy = node.createdBy;
    this.libraryTypeId = node.libraryTypeId;
    this.version = node.version;
    this.aspect = node.aspect;
    this.nodeType = node.nodeType;
    this.masterProjectId = node.masterProjectId;
    this.masterProjectIri = node.masterProjectIri;
    this.symbol = node.symbol;
    this.purposeString = node.purposeString;
    this.connectors = node.connectors;
    this.attributes = node.attributes;
    this.projectId = node.projectId;
    this.projectIri = node.projectIri;
    this.width = node.width;
    this.height = node.height;
    this.hidden = node.hidden;
    this.blockHidden = node.blockHidden;
    this.selected = node.selected;
    this.blockSelected = node.blockSelected;
  }

  // TODO: Move is part of relation to a more generic place

  // TODO: Move is part of relation to a more generic place
  public findChildrenEdge(edges: Edge[]): Edge {
    return edges.find((edge) => edge.fromNodeId === this.id && IsPartOfRelation(edge.fromConnector));
  }

  public hasChildren(edges: Edge[]): boolean {
    return !!this.findChildrenEdge(edges);
  }

  // TODO: Refactor this code into MimirProject completely, this function is currently used in SetSiblingRDS.ts
  public findParentEdge(nodeId: string, edges: MimirEdge[]): MimirEdge {
    return edges.find((edge) => edge.toNodeId === nodeId && IsPartOfRelation(edge.fromConnector));
  }

  public isAspectNode = (node?: MimirNode) => {
    if (node) {
      return node.nodeType === NodeType.Root;
    }
    return this.nodeType === NodeType.Root;
  };

  public isAncestorInSet(currentNode: MimirNode, set: Set<string>, edges: MimirEdge[]): boolean {
    const edge = this.findParentEdge(currentNode.id, edges);
    if (!edge) return false;

    const parentNode = edge.fromNode as MimirNode;
    if (set.has(parentNode.id)) return true;

    return this.isAncestorInSet(parentNode, set, edges);
  }

  public isLocation = () => {
    return this.aspect === Aspect.Location;
  };

  isProduct = () => {
    return this.aspect === Aspect.Product;
  };

  public isFunction = () => {
    return this.aspect === Aspect.Function;
  };

  public convertToNode(): Node {
    return {
      id: this.id,
      iri: this.iri,
      domain: this.domain,
      kind: this.kind,
      rds: this.rds,
      description: this.description,
      typeReferences: this.typeReferences,
      name: this.name,
      label: this.label,
      positionX: this.positionX,
      positionY: this.positionY,
      isLocked: this.isLocked,
      isLockedStatusBy: this.isLockedStatusBy,
      isLockedStatusDate: this.isLockedStatusDate,
      positionBlockX: this.positionBlockX,
      positionBlockY: this.positionBlockY,
      level: this.level,
      order: this.order,
      updatedBy: this.updatedBy,
      updated: this.updated,
      created: this.created,
      createdBy: this.createdBy,
      libraryTypeId: this.libraryTypeId,
      version: this.version,
      aspect: this.aspect,
      nodeType: this.nodeType,
      masterProjectId: this.masterProjectId,
      masterProjectIri: this.masterProjectIri,
      symbol: this.symbol,
      purposeString: this.purposeString,
      connectors: this.connectors,
      attributes: this.attributes,
      projectId: this.projectId,
      projectIri: this.projectIri,
      width: this.width,
      height: this.height,
      hidden: this.hidden,
      blockHidden: this.blockHidden,
      selected: this.selected,
      blockSelected: this.blockSelected,
    };
  }
}
