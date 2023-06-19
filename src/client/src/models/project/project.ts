import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { ConnectorTerminal } from "lib";
import { SetCenter, SetViewport } from "react-flow-renderer";

export const ATTRIBUTE_TAB = {
  ADMIN_INFO: "AdminInfo",
  PARAMETERS: "Parameters",
  TERMINALS: "Terminals",
  RELATIONS: "Relations",
};

export type EdgeType = keyof typeof EDGE_TYPE;
export const EDGE_TYPE = {
  BLOCK_TRANSPORT: "BlockTransportEdgeType",
  BLOCK_RELATION: "BlockRelationEdgeType",
  BLOCK_PARTOF: "BlockPartOfEdgeType",
  TREE_PARTOF: "TreeConnectionPartOf",
  TREE_RELATION: "TreeRelationEdgeType",
  TREE_TRANSPORT: "TreeTransportEdgeType",
};

export const MODULE_TYPE = {
  EXPLORER: "Explorer",
  INSPECTOR: "Inspector",
  LIBRARY: "Library",
  LEGEND: "Legend",
};

export const MENU_TYPE = {
  USER_MENU: "UserMenu",
  PROJECT_MENU: "ProjectMenu",
  OPEN_PROJECT_MENU: "OpenProjectMenu",
  CREATE_PROJECT_MENU: "CreateProjectMenu",
  CLOSE_PROJECT_MENU: "CloseProjectMenu",
  IMPORT_PROJECT_FILE_MENU: "ImportProjectFile",
  EXPORT_PROJECT_FILE_MENU: "ExportProjectFile",
  IMPORT_LIBRARY_FILE_MENU: "ImportLibraryFile",
  EXPORT_LIBRARY_FILE_MENU: "ExportLibraryFile",
  COMMIT_PROJECT_MENU: "CommitProjectMenu",
  CREATE_SUB_PROJECT_MENU: "CreateSubProjectMenu",
  INSTRUCTION_PROJECT_MENU: "InstructionProjectMenu",
  VISUAL_FILTER_MENU: "VisualFilter",
  CONVERT_SUB_PROJECT_MENU: "ConvertSubProjectMenu",
};

export interface LibraryCategory {
  name: string;
  nodes: AspectObjectLibCm[];
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

export interface TerminalCategoryObject {
  name: string;
  terminals: ConnectorTerminal[];
}

export interface ViewportData {
  setViewport: SetViewport;
  setCenter: SetCenter;
}

export interface AttributeDescriptor {
  header: string;
  value: string;
}
