export type EdgeType = keyof typeof EDGE_TYPE;

export const EDGE_TYPE = {
  STEP: "SmoothStepPath",
  BEZIER: "BezierPath"
};

export type NodeType = keyof typeof NODE_TYPE;

export const NODE_TYPE = {
  ASPECT: "Aspect",
  FUNCTION: "Function",
  PRODUCT: "Product",
  LOCATION: "Location"
};

export type IconType = keyof typeof ICON_TYPE;

export const ICON_TYPE = {
    FUNCTION_ICON: "FunctionIcon",
    LOCATION_ICON: "LocationIcon",
    PRODUCT_ICON: "ProductIcon"
};

export type ConnectorType = keyof typeof CONNECTOR_TYPE;

export const CONNECTOR_TYPE = {
    RELATION_INPUT: "RelationInput",
    RELATION_OUTPUT: "RelationOutput",
    TRANSPORT_INPUT: "TransportInput", 
    TRANSPORT_OUTPUT: "TransportOutput"
};
export interface Project {
    id: string,
    name: string,
    description: string,
    nodes: Node[],
    edges: Edge[]    
}
export interface Connector {
    id: string,
    name: string,
    type: ConnectorType
}

export interface Edge {
    id: string,
    from: Connector,
    to: Connector,
    fromNode: Node,
    toNode: Node
}

export interface Position {
    x: number,
    y: number
}

export interface Node {
    id: string,
    name: string,
    icon: IconType,
    label: string,
    type: NodeType,
    position: Position,
    connectors: Connector[]
}

export interface LibNode {
    id: string,
    name: string,
    label: string,
    icon: string,    
    type: NodeType,
    connectors: Connector[],
    category: string
    // TODO: Add rules
}