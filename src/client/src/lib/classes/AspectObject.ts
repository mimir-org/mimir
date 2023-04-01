import { Attribute, Connector, TypeReference, AspectObjectAm } from ".";
import { Aspect, ConnectorTerminal, Direction } from "..";
import { Node as FlowNode, XYPosition } from "react-flow-renderer";
import { CreateId } from "components/flow/helpers";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Position } from "models/project";

export class AspectObject {
  // Domain members
  id: string;
  rds: string;
  description: string;
  typeReferences: TypeReference[];
  name: string;
  label: string;
  threePosX: number;
  threePosY: number;
  blockPosX: number;
  blockPosY: number;
  updated: Date;
  updatedBy: string;
  created: Date;
  createdBy: string;
  libraryType: string;
  version: string;
  aspect: Aspect;
  mainProject: string;
  symbol: string;
  purpose: string;
  project: string;
  attributes: Attribute[];
  connectors: Connector[];
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date | null;

  // Client members
  selected: boolean;
  blockSelected: boolean;
  hidden: boolean;
  domain: string;

  // Constructor
  public constructor(lib: NodeLibCm, project: string, position?: Position, createdBy?: string, mainProject?: string) {
    this.id = CreateId();
    this.rds = lib.rdsCode;
    this.description = lib.description;
    this.typeReferences = [];
    this.name = lib.name;
    this.label = null;

    this.threePosX = position == null ? 50.0 : position.x;
    this.threePosY = position == null ? 50.0 : position.y;
    this.blockPosX = position == null ? 50.0 : position.x;
    this.blockPosY = position == null ? 50.0 : position.y;
    this.updated = null;
    this.updatedBy = null;
    this.created = new Date();
    this.createdBy = createdBy == null ? "system" : createdBy;
    this.libraryType = lib.iri;
    this.version = "1.0";
    this.aspect = lib.aspect;
    this.mainProject = mainProject == null ? project : mainProject;
    this.symbol = lib.symbol;
    this.purpose = lib.purposeName;
    this.project = project;
    this.attributes = lib.attributes?.map((x) => new Attribute(x, this.id)) ?? [];

    // TODO: Also create default connectors
    this.connectors = lib.nodeTerminals?.map((x) => new ConnectorTerminal(x.terminal, Direction.Input, this.id)) ?? []; // TODO: Resolve direction
    this.isLocked = false;
    this.isLockedStatusBy = null;
    this.isLockedStatusDate = null;

    this.selected = false;
    this.blockSelected = false;
    this.hidden = false;
    this.domain = ""; // TODO: Resolve domain
  }

  public toAm(): AspectObjectAm {
    return new AspectObjectAm(this);
  }

  public convertToFlowNode(name: "Block" | "Tree"): FlowNode {
    const position: XYPosition = { x: this.threePosX, y: this.threePosY };
    const node: FlowNode = {
      id: this.id,
      type: this.getComponentType(),
      data: this,
      position: position,
      hidden: false, // Opacity is controlled by the styled component
      selected: this.selected,
      draggable: true,
      selectable: true,
      connectable: true,
    };
    return node;
  }

  public hasConnector(connector: string): boolean {
    return this.connectors?.some((x) => x.id === connector);
  }

  public getComponentType(): string | null {
    let typeName = this.libraryType == null ? "Aspect" : "";
    typeName += Aspect[this.aspect];
    return typeName;
  }

  public getConnector(connector: string): Connector | null {
    return this.connectors.find((x) => x.id === connector);
  }

  public getTerminals(): ConnectorTerminal[] {
    return this.connectors.filter((g) => g instanceof ConnectorTerminal) as ConnectorTerminal[];
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
}

// export class MimirNode implements Node {
//   id: string;
//   iri: string;
//   domain: string;
//   kind: string;
//   rds: string;
//   description: string;
//   typeReferences: TypeReference[];
//   name: string;
//   label: string;
//   positionX: number;
//   positionY: number;
//   isLocked: boolean;
//   isLockedStatusBy: string;
//   isLockedStatusDate: Date;
//   positionBlockX: number;
//   positionBlockY: number;
//   level: number;
//   order: number;
//   updatedBy: string;
//   updated: Date;
//   created: Date;
//   createdBy: string;
//   libraryTypeId: string;
//   version: string;
//   aspect: Aspect;
//   nodeType: NodeType;
//   masterProjectId: string;
//   masterProjectIri: string;
//   symbol: string;
//   purposeString: string;
//   connectors: Connector[];
//   attributes: Attribute[];
//   projectId: string;
//   projectIri: string;
//   width: number;
//   height: number;
//   hidden: boolean;
//   blockHidden: boolean;
//   selected: boolean;
//   blockSelected: boolean;
//   parentNodeId: string;
//   isOffPageTarget: boolean; // TODO: Remove
//   isOffPageRequired: boolean; // TODO: Remove

//   constructor(node?: Partial<Node>) {
//     if (node) {
//       this.id = node.id;
//       this.iri = node.iri ?? null;
//       this.domain = node.domain ?? null;
//       this.kind = node.kind;
//       this.rds = node.rds;
//       this.description = node.description ?? "";
//       this.typeReferences = node.typeReferences;
//       this.name = node.name;
//       this.label = node.label;
//       this.positionX = node.positionX;
//       this.positionY = node.positionY;
//       this.isLocked = node.isLocked ?? false;
//       this.isLockedStatusBy = node.isLockedStatusBy ?? null;
//       this.isLockedStatusDate = node.isLockedStatusDate ?? null;
//       this.positionBlockX = node.positionBlockX;
//       this.positionBlockY = node.positionBlockY;
//       this.level = node.level ?? 0;
//       this.order = node.order ?? 0;
//       this.updatedBy = node.updatedBy;
//       this.updated = node.updated ?? new Date();
//       this.created = node.created;
//       this.createdBy = node.createdBy;
//       this.libraryTypeId = node.libraryTypeId;
//       this.version = node.version;
//       this.aspect = node.aspect;
//       this.nodeType = node.nodeType;
//       this.masterProjectId = node.masterProjectId;
//       this.masterProjectIri = node.masterProjectIri ?? null;
//       this.symbol = node.symbol;
//       this.purposeString = node.purposeString;
//       this.connectors = node.connectors;
//       this.attributes = node.attributes;
//       this.projectId = node.projectId;
//       this.projectIri = node.projectIri ?? null;
//       this.width = node.width;
//       this.height = node.height;
//       this.hidden = node.hidden ?? false;
//       this.blockHidden = node.blockHidden ?? false;
//       this.selected = node.selected ?? false;
//       this.blockSelected = node.blockSelected ?? false;
//       this.parentNodeId = node.parentNodeId;
//       this.isOffPageTarget = node.isOffPageTarget ?? null; // TODO: Remove
//       this.isOffPageRequired = node.isOffPageRequired ?? null; // TODO: Remove
//     }
//   }

//   /**
//    * Locks the current Aspect
//    * @param state boolean, can be set to true or false.
//    * @param user optional, if not set, user will be "system".
//    */
//   public setLocked(locked: boolean, user?: string): void {
//     this.isLocked = locked;
//     this.isLockedStatusBy = user ?? "system";
//     this.isLockedStatusDate = new Date(); //getDateNowUtc();
//   }

//   // TODO: Move is part of relation to a more generic place
//   public findChildrenEdge(edges: Edge[]): Edge {
//     return edges.find((edge) => edge.fromNodeId === this.id && edge.fromConnector instanceof ConnectorPartOf);
//   }

//   public hasChildren(edges: Edge[]): boolean {
//     return !!this.findChildrenEdge(edges);
//   }

//   // TODO: Refactor this code into MimirProject completely, this function is currently used in SetSiblingRDS.ts
//   public findParentEdge(nodeId: string, edges: MimirEdge[]): MimirEdge {
//     return edges.find((edge) => edge.toNodeId === nodeId && edge.fromConnector instanceof ConnectorPartOf);
//   }

//   public isAspectNode = (node?: MimirNode) => {
//     if (node) {
//       return node.nodeType === NodeType.Root;
//     }
//     return this.nodeType === NodeType.Root;
//   };

//   public isAncestorInSet(currentNode: MimirNode, set: Set<string>, edges: MimirEdge[]): boolean {
//     const edge = this.findParentEdge(currentNode?.id ?? null, edges);
//     if (!edge) return false;

//     const parentNode = edge.fromNode as MimirNode;
//     if (set.has(parentNode?.id)) return true;

//     return this.isAncestorInSet(parentNode, set, edges);
//   }

//   public isLocation(): boolean {
//     return this.aspect === Aspect.Location;
//   }

//   public isProduct(): boolean {
//     return this.aspect === Aspect.Product;
//   }

//   public isFunction(): boolean {
//     return this.aspect === Aspect.Function;
//   }

//   public getMainColor() {
//     if (this.isFunction()) return Color.LEMON_YELLOW;
//     if (this.isProduct()) return Color.ELECTRIC_BLUE;
//     if (this.isLocation()) return Color.MAGENTA;
//   }

//   public getSelectedColor() {
//     if (this.isFunction()) return Color.SUNGLOW;
//     if (this.isProduct()) return Color.VIRIDIAN_GREEN;
//     if (this.isLocation()) return Color.PURPLE_MUNSELL;
//   }

//   public getTransparentColor(): string {
//     if (this.isFunction()) return "rgba(251, 201, 19, 0.1)";
//     if (this.isProduct()) return "rgba(6, 144, 152, 0.1)";
//     if (this.isLocation()) return "rgba(163, 0, 167, 0.1)";
//   }

//   public getTabColor() {
//     if (this.isFunction()) return Color.JASMINE;
//     if (this.isProduct()) return Color.DARK_TURQUOISE;
//     if (this.isLocation()) return Color.PINK;
//   }

//   public getHeaderColor() {
//     if (this.isFunction()) return Color.LEMON_YELLOW_CRAYOLA;
//     if (this.isProduct()) return Color.CELESTE;
//     if (this.isLocation()) return Color.PINK_LACE;
//   }

//   public getAspectIcon = (): string => {
//     if (!this.isAspectNode()) console.error("Node is not an aspectNode, this.aspect:", this.aspect);
//     if (this.aspect === Aspect.Function) return Icons.Function;
//     if (this.aspect === Aspect.Product) return Icons.Product;
//     if (this.aspect === Aspect.Location) return Icons.Location;
//   };

//   // Converters
//   public convertToFlowNode(): FlowNode {
//     const position = { x: this.positionX, y: this.positionY };

//     return {
//       id: this.id,
//       type: this.getNodeType(),
//       data: this,
//       position: position,
//       hidden: false, // Opacity is controlled by the styled component
//       selected: this.selected,
//       draggable: true,
//       selectable: true,
//       connectable: true,
//     } as FlowNode;
//   }

//   public getNodeType(): string {
//     let typeName = this.nodeType === NodeType.Root ? "Aspect" : this.nodeType === NodeType.Handler ? "Handle" : "";
//     typeName += Aspect[this.aspect];
//     return typeName;
//   }

//   public convertToNode(): Node {
//     return {
//       id: this.id,
//       iri: this.iri,
//       domain: this.domain,
//       kind: this.kind,
//       rds: this.rds,
//       description: this.description,
//       typeReferences: this.typeReferences,
//       name: this.name,
//       label: this.label,
//       positionX: this.positionX,
//       positionY: this.positionY,
//       isLocked: this.isLocked,
//       isLockedStatusBy: this.isLockedStatusBy,
//       isLockedStatusDate: this.isLockedStatusDate,
//       positionBlockX: this.positionBlockX,
//       positionBlockY: this.positionBlockY,
//       level: this.level,
//       order: this.order,
//       updatedBy: this.updatedBy,
//       updated: this.updated,
//       created: this.created,
//       createdBy: this.createdBy,
//       libraryTypeId: this.libraryTypeId,
//       version: this.version,
//       aspect: this.aspect,
//       nodeType: this.nodeType,
//       masterProjectId: this.masterProjectId,
//       masterProjectIri: this.masterProjectIri,
//       symbol: this.symbol,
//       purposeString: this.purposeString,
//       connectors: this.connectors,
//       attributes: this.attributes,
//       projectId: this.projectId,
//       projectIri: this.projectIri,
//       width: this.width,
//       height: this.height,
//       hidden: this.hidden,
//       blockHidden: this.blockHidden,
//       selected: this.selected,
//       blockSelected: this.blockSelected,
//       parentNodeId: this.parentNodeId,
//       isOffPageTarget: this.isOffPageTarget,
//       isOffPageRequired: this.isOffPageRequired,
//     };
//   }
// }
