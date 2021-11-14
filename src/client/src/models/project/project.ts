import { LibItem } from "../";

// TODO : remove?
export interface Dictionary {
  key: string;
  value: string;
}

export type AttributeTab = keyof typeof ATTRIBUTE_TAB;
export const ATTRIBUTE_TAB = {
  ADMIN_INFO: "AdminInfo",
  PARAMETERS: "Parameters",
  TERMINALS: "Terminals",
  RELATIONS: "Relations",
  SIMPLE_TYPES: "SimpleTypes",
};

export type EdgeType = keyof typeof EDGE_TYPE;
export const EDGE_TYPE = {
  BLOCK: "BlockEdgeType",
  BLOCK_PART: "BlockPartEdgeType",
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
  USER_MENU: "UserMenu",
  PROJECT_MENU: "ProjectMenu",
  OPEN_PROJECT_MENU: "OpenProjectMenu",
  CREATE_PROJECT_MENU: "CreateProjectMenu",
  VISUAL_FILTER_MENU: "VisualFilter",
  SAVE_PROJECT_FILE_MENU: "SaveProjectFile",
  IMPORT_PROJECT_FILE_MENU: "ImportProjectFile",
  SAVE_LIBRARY_FILE_MENU: "SaveLibraryFile",
  IMPORT_LIBRARY_FILE_MENU: "ImportLibraryFile",
  COMMIT_PROJECT: "CommitProject",
  CREATE_SUB_PROJECT_MENU: "CreateSubProjectMenu",
};

export type ViewType = keyof typeof VIEW_TYPE;
export const VIEW_TYPE = {
  BLOCKVIEW: "blockview",
  TREEVIEW: "treeview",
  TYPE_EDITOR: "type-editor",
};

export interface LibraryCategory {
  name: string;
  nodes: LibItem[];
}

export interface EdgeEvent {
  nodeId: string;
  handleType: string;
  sourceId: string;
}

export interface BlockNodeSize {
  width: number;
  length: number;
}
