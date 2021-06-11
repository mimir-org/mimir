export type BuildStatus = keyof typeof BUILD_STATUS;
export const BUILD_STATUS = {
  NotSet: "NotSet",
  Unused: "Unused",
  Reserved: "Reserved",
  Planned: "Planned",
  AsBuilt: "AsBuilt",
  Historic: "Historic",
  OutOfService: "OutOfService",
};

export type AttributeTab = keyof typeof ATTRIBUTE_TAB;
export const ATTRIBUTE_TAB = {
  ADMIN_INFO: "AdminInfo",
  TECH_INFO: "TechInfo",
  TERMINALS: "Terminals",
  RELATIONS: "Relations",
};

export type EdgeType = keyof typeof EDGE_TYPE;
export const EDGE_TYPE = {
  DEFAULT: "DefaultEdgeType",
  BLOCK: "BlockEdgeType",
  PART: "PartEdgeType",
  RELATION: "RelationEdgeType",
  TRANSPORT: "TransportEdgeType",
};

export type LineEdgeType = keyof typeof LINE_EDGE_TYPE;
export const LINE_EDGE_TYPE = {
  STEP: "SmoothStepPath",
  BEZIER: "BezierPath",
};

export type NodeType = keyof typeof NODE_TYPE;
export const NODE_TYPE = {
  ASPECT_FUNCTION: "AspectFunction",
  ASPECT_PRODUCT: "AspectProduct",
  ASPECT_LOCATION: "AspectLocation",
  FUNCTION: "Function",
  PRODUCT: "Product",
  LOCATION: "Location",
  OFF_PAGE: "Offpage",
};

export type ModuleType = keyof typeof MODULE_TYPE;
export const MODULE_TYPE = {
  EXPLORER: "Explorer",
  INSPECTOR: "Inspector",
  LIBRARY: "Library",
  TYPEEDITOR: "TypeEditor",
  LEGEND: "Legend",
};

export type MenuType = keyof typeof MENU_TYPE;
export const MENU_TYPE = {
  VISUAL_FILTER: "VisualFilter",
  ACCOUNT: "Account",
};

export type ProjectMenuType = keyof typeof PROJECT_MENU_TYPE;
export const PROJECT_MENU_TYPE = {
  ACCOUNT_MENU: "AccountMenu",
  OPEN_PROJECT_MENU: "OpenProjectMenu",
  MAIN_MENU: "MainMenu",
  CREATE_PROJECT_MENU: "CreateProjectMenu",
};

export type ViewType = keyof typeof VIEW_TYPE;
export const VIEW_TYPE = {
  BLOCKVIEW: "blockview",
  TREEVIEW: "treeview",
  TYPE_EDITOR: "type-editor",
};

export type SplitViewPosition = keyof typeof SPLITVIEW_POSITION;
export const SPLITVIEW_POSITION = {
  RIGHT: "right",
  LEFT: "left",
};

export type IconType = keyof typeof ICON_TYPE;
export const ICON_TYPE = {
  NOTSET_ICON: "NotSetIcon",
  FUNCTION_ICON: "FunctionIcon",
  LOCATION_ICON: "LocationIcon",
  PRODUCT_ICON: "ProductIcon",
  TRANSPORT_ICON: "TransportIcon",
  INTERFACE_ICON: "InterfaceIcon",
};

export type ConnectorType = keyof typeof CONNECTOR_TYPE;
export const CONNECTOR_TYPE = {
  INPUT: "Input",
  OUTPUT: "Output",
};

export type Terminal = keyof typeof TERMINAL;
export const TERMINAL = {
  NotSet: "NotSet",
  Electric: "Electric",
  Thermal: "Thermal",
  Solar: "Solar",
  Mechanical: "Mechanical",
  Sound: "Sound",
  Wind: "Wind",
  HydroPower: "HydroPower",
  Fluid: "Fluid",
  DryGranulated: "DryGranulated",
  SolidPieces: "SolidPieces",
  Bracket: "Bracket",
  Bolts: "Bolts",
  Flanges: "Flanges",
  Sensor: "Sensor",
  Water: "Water",
  Oil: "Oil",
  ChemicalFluids: "ChemicalFluids",
  MultiphaseFluids: "MultiphaseFluids",
  WetGas: "WetGas",
  Vapour: "Vapour",
  Gas: "Gas",
  Sand: "Sand",
  Powder: "Powder",
  Bricks: "Bricks",
  Boxes: "Boxes",
  Pieces: "Pieces",
};

export type TerminalCategory = keyof typeof TERMINAL_CATEGORY;
export const TERMINAL_CATEGORY = {
  NotSet: "NotSet",
  Forces: "Forces",
  Information: "Information",
  Energy: "Energy",
  MaterialFlow: "MaterialFlow",
};

export type RelationType = keyof typeof RELATION_TYPE;
export const RELATION_TYPE = {
  NotSet: "NotSet",
  HasLocation: "HasLocation",
  PartOf: "PartOf",
  Transport: "Transport",
  FulfilledBy: "FulfilledBy",
};

export interface Project {
  id: string;
  parentId: string;
  version: string;
  name: string;
  description: string;
  projectOwner: string;
  updatedBy: string;
  updated: Date;
  nodes: Node[];
  edges: Edge[];
  isSubProject: boolean;
}
export interface ProjectSimple {
  id: string;
  name: string;
  description: string;
  projectOwner: string;
  updated: Date;
  updatedBy: string;
  selected: boolean;
}

export interface Connector {
  id: string;
  name: string;
  type: ConnectorType;
  terminalCategory: TerminalCategory;
  terminal: Terminal;
  relationType: RelationType;
  semanticReference: string;
  nodeId: string;
  attributes?: Attribute[] | null;
  mediaColor: string | null;
  transportColor: string | null;
}

export interface Edge {
  id: string;
  fromConnector: string;
  toConnector: string;
  fromNode: string;
  toNode: string;
  isHidden: boolean | false;
  parentType: NodeType;
  targetType: NodeType;
}

export interface Attribute {
  id: string;
  nodeId: string;
  connectorId: string;
  key: string;
  value: string;
  unit: string;
  qualifier: string;
  source: string;
  condition: string;
  format: string;
  units: string[];
}

export interface Node {
  id: string;
  rds: string;
  contractor: string;
  semanticId: string;
  tagNumber: string;
  description: string;
  name: string;
  icon: IconType;
  label: string;
  type: NodeType;
  positionX: number;
  positionY: number;
  connectors: Connector[];
  isLocked?: boolean | false;
  isSelected?: boolean | false;
  isBlockSelected?: boolean | false;
  attributes?: Attribute[] | null;
  isHidden: boolean | false;
  positionBlockX: number;
  positionBlockY: number;
  length: number;
  width: number;
  height: number;
  area: number;
  status: BuildStatus;
  updatedBy: string;
  updated: Date;
  version: string;
  level: number;
  order: number;
}

export interface LibNode {
  id: string;
  rds: string;
  name: string;
  label: string;
  icon: IconType;
  type: NodeType;
  connectors: Connector[];
  category: string;
  attributes?: Attribute[] | null;
  version: string;
  semanticReference: string;
}

export interface LibCategory {
  name: string;
  nodes: LibNode[];
}

export interface EdgeEvent {
  nodeId: string;
  handleType: string;
  sourceId: string;
}

export enum BackgroundVariant {
  Lines = "lines",
  Dots = "dots",
}

export interface Dictionary {
  key: string;
  value: string;
}
export interface Rds {
  id: number;
  category: Dictionary;
  code: string;
  name: string;
  semanticReferance: string;
  isFunction: boolean;
  isProduct: boolean;
  isLocation: boolean;
}
export interface TerminalType {
  id: string;
  terminal: Dictionary;
  connectorType: Dictionary;
  semanticReferance: string;
}
export interface AttributeType {
  id: number;
  entity: string;
  qualifier: Dictionary;
  source: Dictionary;
  condition: Dictionary;
  units: Dictionary[];
  aspect: Dictionary;
  format: Dictionary;
  isInterface: boolean;
  isTerminalType: boolean;
}
export interface LibraryType {
  id: string;
  aspect: string;
  objectType: string;
  typeName: string;
  status: string;
  rds: string;
  rdsCategory: string;
  semanticRdsReference: string;
  terminals: TerminalType[];
  attributes: AttributeType[];
  version: string;
  semanticReference: string;
}
