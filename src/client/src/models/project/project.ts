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
  ASPECT: "Aspect",
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
  RELATION_INPUT: "RelationInput",
  RELATION_OUTPUT: "RelationOutput",
  TRANSPORT_INPUT: "TransportInput",
  TRANSPORT_OUTPUT: "TransportOutput",
  PARTOF_INPUT: "PartofInput",
  PARTOF_OUTPUT: "PartofOutput",
};
export interface Project {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}
export interface Connector {
  id: string;
  name: string;
  type: ConnectorType;
}

export interface Edge {
  id: string;
  fromConnector: string;
  toConnector: string;
  fromNode: string;
  toNode: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Attribute {
  key: string;
  value: string;
}

export interface Node {
  id: string;
  name: string;
  icon: IconType;
  label: string;
  type: NodeType;
  position: Position;
  connectors: Connector[];
  isLocked?: boolean | false;
  isSelected?: boolean | false;
  Attributes?: Attribute[] | null;
}

export interface LibNode {
  id: string;
  name: string;
  label: string;
  icon: string;
  type: NodeType;
  connectors: Connector[];
  category: string;
  Attributes?: Attribute[] | null;
  // TODO: Add rules
}
