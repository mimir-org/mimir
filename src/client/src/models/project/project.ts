import { LibItem } from "../";

export const ATTRIBUTE_TAB = {
  ADMIN_INFO: "AdminInfo",
  PARAMETERS: "Parameters",
  TERMINALS: "Terminals",
  RELATIONS: "Relations",
  SIMPLE_TYPES: "SimpleTypes",
};

export type EdgeType = keyof typeof EDGE_TYPE;
export const EDGE_TYPE = {
  BLOCK_TRANSPORT: "BlockTransportEdgeType",
  BLOCK_OFFPAGE: "BlockOffPageEdgeType",
  BLOCK_RELATION: "BlockRelationEdgeType",
  PART: "PartEdgeType",
  RELATION: "RelationEdgeType",
  TRANSPORT: "TransportEdgeType",
};

export const MODULE_TYPE = {
  EXPLORER: "Explorer",
  INSPECTOR: "Inspector",
  LIBRARY: "Library",
  TYPEEDITOR: "TypeEditor",
  LEGEND: "Legend",
};

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
  INSTRUCTION_PROJECT_MENU: "InstructionProjectMenu",
};

export type ViewType = keyof typeof VIEW_TYPE;
export const VIEW_TYPE = {
  STARTPAGE: "startpage",
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

export interface Position {
  x: number;
  y: number;
}

export interface BlockNodeSize {
  width: number;
  height: number;
}
