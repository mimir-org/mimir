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
    RELATIONS: "Relations",
};

export type EdgeType = keyof typeof EDGE_TYPE;

export const EDGE_TYPE = {
    DEFAULT: "DefaultEdgeType",
    BLOCK: "BlockEdgeType",
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
    LEGEND: "Legend",
};

export type MenuType = keyof typeof MENU_TYPE;

export const MENU_TYPE = {
    VISUAL_FILTER: "VisualFilter",
    ACCOUNT: "Account",
};

export type ViewType = keyof typeof VIEW_TYPE;

export const VIEW_TYPE = {
    BLOCKVIEW: "blockview",
    TREEVIEW: "treeview",
    TYPE_EDITOR: "type-editor",
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
    terminalType: TerminalType;
    relationType: RelationType;
    semanticReference: string;
    nodeId: string;
    attributes?: Attribute[] | null;
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
    key: string;
    value: string;
    unit: string;
    qualifier: string;
    source: string;
    condition: string;
    format: string;
    units: string[];
    nodeId: string;
    connectorId: string;
}

export interface Node {
    id: string;
    rds: string;
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
