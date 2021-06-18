import { LibraryNodeItem } from "../";

// TODO : remove
export interface Dictionary {
  key: string;
  value: string;
}

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

export interface LibCategory {
  name: string;
  nodes: LibraryNodeItem[];
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
