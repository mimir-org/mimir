export type AttributeInputType = keyof typeof ATTRIBUTE_INPUT_TYPE;

export const ATTRIBUTE_INPUT_TYPE = {
    TEXT: "Text",
    LONG_TEXT: "LongText",
    DROPDOWN: "Dropdown",
    DATE: "Date"
};

export type AttributeType = keyof typeof ATTRIBUTE_TYPE;

export const ATTRIBUTE_TYPE = {
    ADMIN_INFO: "AdminInfo",
    TECH_INFO: "TechInfo",
    RELATIONS: "Relations"
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
    isHidden: boolean | false;
    parentType: NodeType;
    parentName: string;
}

export interface Position {
    x: number;
    y: number;
}

export interface Attribute {
    key: string;
    value: string;
    unit: string;
    type: AttributeType,
    inputType: AttributeInputType
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
