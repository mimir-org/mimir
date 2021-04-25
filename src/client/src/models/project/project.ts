export type AttributeInputType = keyof typeof ATTRIBUTE_INPUT_TYPE;

export const ATTRIBUTE_INPUT_TYPE = {
  TEXT: "Text",
  LONG_TEXT: "LongText",
  DROPDOWN: "Dropdown",
  DATE: "Date",
};

export type AttributeType = keyof typeof ATTRIBUTE_TYPE;

export const ATTRIBUTE_TYPE = {
  ADMIN_INFO: "AdminInfo",
  TECH_INFO: "TechInfo",
  RELATIONS: "Relations",
};

export type EdgeType = keyof typeof EDGE_TYPE;

export const EDGE_TYPE = {
  DEFAULT: "DefaultEdgeType",
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
};

export type IconType = keyof typeof ICON_TYPE;

export const ICON_TYPE = {
  FUNCTION_ICON: "FunctionIcon",
  LOCATION_ICON: "LocationIcon",
  PRODUCT_ICON: "ProductIcon",
};

export type ConnectorType = keyof typeof CONNECTOR_TYPE;

export const CONNECTOR_TYPE = {
  INPUT: "Input",
  OUTPUT: "Output",
};

export type TerminalType = keyof typeof TERMINAL_TYPE;

export const TERMINAL_TYPE = {
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
  Relation: "Relation",
  PartOf: "PartOf",
  Transport: "Transport",
};

export interface Project {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}
export interface ProjectSimple {
  id: string;
  name: string;
  description: string;
  projectOwner: string;
  lastEdited: Date;
  selected: boolean;
}

export interface Connector {
  id: string;
  name: string;
  type: ConnectorType;
  terminalCategory: TerminalCategory;
  terminalType: TerminalType;
  relationType: RelationType;
  nodeId: string;
}

export interface Edge {
  id: string;
  fromConnector: string;
  toConnector: string;
  fromNode: string;
  toNode: string;
  isHidden: boolean | false;
  parentType: NodeType;
  parentName: string;
}

export interface Attribute {
  key: string;
  value: string;
  unit: string;
  type: AttributeType;
  inputType: AttributeInputType;
  nodeId: string;
}

export interface Node {
  id: string;
  name: string;
  icon: IconType;
  label: string;
  type: NodeType;
  positionX: number;
  positionY: number;
  connectors: Connector[];
  isLocked?: boolean | false;
  isSelected?: boolean | false;
  attributes?: Attribute[] | null;
  isHidden: boolean | false;
}

export interface LibNode {
  id: string;
  name: string;
  label: string;
  icon: string;
  type: NodeType;
  connectors: Connector[];
  category: string;
  attributes?: Attribute[] | null;
}
