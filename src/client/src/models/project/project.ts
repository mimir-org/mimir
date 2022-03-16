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
  TREE_PARTOF: "TreePartOfEdgeType",
  TREE_RELATION: "TreeRelationEdgeType",
  TREE_TRANSPORT: "TreeTransportEdgeType",
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
  IMPORT_PROJECT_FILE_MENU: "ImportProjectFile",
  EXPORT_PROJECT_FILE_MENU: "ExportProjectFile",
  IMPORT_LIBRARY_FILE_MENU: "ImportLibraryFile",
  EXPORT_LIBRARY_FILE_MENU: "ExportLibraryFile",
  COMMIT_PROJECT_MENU: "CommitProjectMenu",
  CREATE_SUB_PROJECT_MENU: "CreateSubProjectMenu",
  INSTRUCTION_PROJECT_MENU: "InstructionProjectMenu",
  VISUAL_FILTER_MENU: "VisualFilter",
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
