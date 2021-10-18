import { Project, Node, Edge, CommitPackage } from "../../../models";
import { ProjectAm } from "../../sagas/project/ConvertProject";
import { ApiError } from "../../../models/webclient";
export const SAVE_PROJECT = "SAVE_PROJECT";
export const COMMIT_PROJECT = "COMMIT_PROJECT";
export const COMMIT_PROJECT_SUCCESS_OR_ERROR = "COMMIT_PROJECT_SUCCESS_OR_ERROR";
export const SAVE_PROJECT_SUCCESS_OR_ERROR = "SAVE_PROJECT_SUCCESS_OR_ERROR";
export const FETCHING_PROJECT = "FETCHING_PROJECT";
export const SEARCH_PROJECT = "SEARCH_PROJECT";
export const SEARCH_PROJECT_SUCCESS_OR_ERROR = "SEARCH_PROJECT_SUCCESS_OR_ERROR";
export const FETCHING_PROJECT_SUCCESS_OR_ERROR = "FETCHING_PROJECT_SUCCESS_OR_ERROR";
export const CREATING_PROJECT = "CREATING_PROJECT";
export const CREATING_PROJECT_SUCCESS_OR_ERROR = "CREATING_PROJECT_SUCCESS_OR_ERROR";
export const ADD_NODE = "ADD_NODE";
export const REMOVE_NODE = "REMOVE_NODE";
export const ADD_EDGE = "ADD_EDGE";
export const REMOVE_EDGE = "REMOVE_EDGE";
export const UPDATE_POSITION = "UPDATE_POSITION";
export const UPDATE_BLOCK_POSITION = "UPDATE_BLOCK_POSITION";
export const SET_NODE_VISIBILITY = "SET_NODE_VISIBILITY";
export const SET_EDGE_VISIBILITY = "SET_EDGE_VISIBILITY";
export const SET_ACTIVE_NODE = "SET_ACTIVE_NODE";
export const SET_ACTIVE_BLOCKNODE = "SET_ACTIVE_BLOCKNODE";
export const SET_ACTIVE_EDGE = "SET_ACTIVE_EDGE";
export const CHANGE_SELECTED_PROJECT = "CHANGE_SELECTED_PROJECT";
export const CHANGE_ALL_NODES = "CHANGE_ALL_NODES";
export const CHANGE_NODE_PROP_VALUE = "CHANGE_NODE_PROP_VALUE";
export const CHANGE_NODE_ATTRIBUTE_VALUE = "CHANGE_NODE_ATTRIBUTE_VALUE";
export const CHANGE_TRANSPORT_ATTRIBUTE_VALUE = "CHANGE_TRANSPORT_ATTRIBUTE_VALUE";
export const CHANGE_INTERFACE_ATTRIBUTE_VALUE = "CHANGE_INTERFACE_ATTRIBUTE_VALUE";
export const CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE = "CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE";
export const CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE = "CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE";
export const CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE = "CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE";
export const CHANGE_COMPOSITE_ATTRIBUTE_VALUE = "CHANGE_COMPOSITE_ATTRIBUTE_VALUE";
export const DELETE_PROJECT_ERROR = "DELETE_PROJECT_ERROR";
export const CHANGE_ACTIVE_CONNECTOR = "CHANGE_ACTIVE_CONNECTOR";
export const EXPORT_PROJECT_TO_FILE = "EXPORT_PROJECT_TO_FILE";
export const EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR = "EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR";
export const IMPORT_PROJECT = "IMPORT_PROJECT";
export const IMPORT_PROJECT_SUCCESS_OR_ERROR = "IMPORT_PROJECT_SUCCESS_OR_ERROR";
export const LOCK_UNLOCK_NODE = "LOCK_UNLOCK_NODE";
export const LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR = "LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR";
export const LOCK_UNLOCK_NODE_ATTRIBUTE = "LOCK_UNLOCK_NODE_ATTRIBUTE";
export const LOCK_UNLOCK_TRANSPORT_ATTRIBUTE = "LOCK_UNLOCK_TRANSPORT_ATTRIBUTE";
export const LOCK_UNLOCK_INTERFACE_ATTRIBUTE = "LOCK_UNLOCK_INTERFACE_ATTRIBUTE";
export const LOCK_UNLOCK_COMPOSITE_ATTRIBUTE = "LOCK_UNLOCK_COMPOSITE_ATTRIBUTE";
export const LOCK_UNLOCK_NODE_TERMINAL_ATTRIBUTE = "LOCK_UNLOCK_NODE_TERMINAL_ATTRIBUTE";
export const LOCK_UNLOCK_TRANSPORT_TERMINAL_ATTRIBUTE = "LOCK_UNLOCK_TRANSPORT_TERMINAL_ATTRIBUTE";
export const LOCK_UNLOCK_INTERFACE_TERMINAL_ATTRIBUTE = "LOCK_UNLOCK_INTERFACE_TERMINAL_ATTRIBUTE";
export const LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR = "LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR";

// State types
export interface ProjectState {
  fetching: boolean;
  creating: boolean;
  project: Project | null;
  projectList: [] | null;
  apiError: ApiError[];
}

// Action types
interface FetchingProjectAction {
  type: typeof FETCHING_PROJECT;
  payload: string;
}

interface SearchProjectAction {
  type: typeof SEARCH_PROJECT;
  payload: string;
}

interface SearchProjectActionFinished {
  type: typeof SEARCH_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    projectList: [];
    apiError: ApiError;
  };
}

interface FetchingProjectActionFinished {
  type: typeof FETCHING_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    project: Project;
    apiError: ApiError;
  };
}

interface CreatingProjectAction {
  type: typeof CREATING_PROJECT;
  payload: object;
}

interface CreatingProjectActionFinished {
  type: typeof CREATING_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    project: Project;
    apiError: ApiError;
  };
}

interface AddNodeAction {
  type: typeof ADD_NODE;
  payload: Node;
}

interface RemoveNodeAction {
  type: typeof REMOVE_NODE;
  payload: string;
}

interface AddEdgeAction {
  type: typeof ADD_EDGE;
  payload: Edge;
}

interface RemoveEdgeAction {
  type: typeof REMOVE_EDGE;
  payload: string;
}

interface UpdatePositionAction {
  type: typeof UPDATE_POSITION;
  payload: {
    nodeId: string;
    x: number;
    y: number;
  };
}
interface UpdateBlockPositionAction {
  type: typeof UPDATE_BLOCK_POSITION;
  payload: {
    nodeId: string;
    x: number;
    y: number;
  };
}

interface SetNodeVisibility {
  type: typeof SET_NODE_VISIBILITY;
  payload: {
    node: Node;
    isParent: boolean;
  };
}

interface SetEdgeVisibility {
  type: typeof SET_EDGE_VISIBILITY;
  payload: {
    edge: Edge;
    isHidden: boolean;
  };
}

interface SetActiveNode {
  type: typeof SET_ACTIVE_NODE;
  payload: {
    nodeId: string;
    isActive: boolean;
  };
}

interface SetActiveEdge {
  type: typeof SET_ACTIVE_EDGE;
  payload: {
    edgeId: string;
    isActive: boolean;
  };
}

interface SetActiveBlockNode {
  type: typeof SET_ACTIVE_BLOCKNODE;
  payload: {
    nodeId: string;
  };
}

interface SaveProjectAction {
  type: typeof SAVE_PROJECT;
  payload: Project;
}

interface SaveProjectActionFinished {
  type: typeof SAVE_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    project: Project;
    apiError: ApiError;
  };
}

interface ChangeSelectedProject {
  type: typeof CHANGE_SELECTED_PROJECT;
  payload: {
    projectId: string;
  };
}

interface ChangeAllNodes {
  type: typeof CHANGE_ALL_NODES;
  payload: {
    visible: boolean;
  };
}

interface ChangeNodePropValue {
  type: typeof CHANGE_NODE_PROP_VALUE;
  payload: {
    nodeId: string;
    propName: string;
    propValue: any;
  };
}

export interface ChangeNodeAttributeValue {
  type: typeof CHANGE_NODE_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    value: string;
    unitId: string;
    nodeId: string;
  };
}
export interface ChangeTransportAttributeValue {
  type: typeof CHANGE_TRANSPORT_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    value: string;
    unitId: string;
    edgeId: string;
  };
}
export interface ChangeInterfaceAttributeValue {
  type: typeof CHANGE_INTERFACE_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    value: string;
    unitId: string;
    edgeId: string;
  };
}
export interface ChangeNodeTerminalAttributeValue {
  type: typeof CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    nodeId;
    value: string;
    unitId: string;
    terminalId: string;
  };
}

export interface ChangeTransportTerminalAttributeValue {
  type: typeof CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    edgeId: string;
    value: string;
    unitId: string;
    terminalId: string;
  };
}

export interface ChangeInterfaceTerminalAttributeValue {
  type: typeof CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    edgeId: string;
    value: string;
    unitId: string;
    terminalId: string;
  };
}
export interface ChangeCompositeAttributeValue {
  type: typeof CHANGE_COMPOSITE_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    value: string;
    unitId: string;
    nodeId: string;
    compositeId: string;
  };
}

interface DeleteProjectErrorAction {
  type: typeof DELETE_PROJECT_ERROR;
  payload: {
    key: string;
  };
}

interface ChangeActiveConnector {
  type: typeof CHANGE_ACTIVE_CONNECTOR;
  payload: {
    node: Node;
    connectorId: string;
    visible: boolean;
    order: number;
  };
}
export interface ExportProjectFileAction {
  type: typeof EXPORT_PROJECT_TO_FILE;
  payload: {
    project: Project;
    fileName: string;
    isSubProject: boolean;
  };
}
export interface ImportProjectAction {
  type: typeof IMPORT_PROJECT;
  payload: ProjectAm;
}

export interface ExportProjectFileActionFinished {
  type: typeof EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}
export interface ImportProjectActionFinished {
  type: typeof IMPORT_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface CommitProject {
  type: typeof COMMIT_PROJECT;
  payload: CommitPackage;
}

export interface CommitProjectFinished {
  type: typeof COMMIT_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface LockUnlockNode {
  type: typeof LOCK_UNLOCK_NODE;
  payload: {
    id: string;
    projectId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockNodeFinished {
  type: typeof LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface LockUnlockNodeAttribute {
  type: typeof LOCK_UNLOCK_NODE_ATTRIBUTE;
  payload: {
    id: string;
    nodeId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockTransportAttribute {
  type: typeof LOCK_UNLOCK_TRANSPORT_ATTRIBUTE;
  payload: {
    id: string;
    edgeId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockInterfaceAttribute {
  type: typeof LOCK_UNLOCK_INTERFACE_ATTRIBUTE;
  payload: {
    id: string;
    edgeId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockNodeTerminalAttribute {
  type: typeof LOCK_UNLOCK_NODE_TERMINAL_ATTRIBUTE;
  payload: {
    id: string;
    terminalId: string;
    nodeId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockTransportTerminalAttribute {
  type: typeof LOCK_UNLOCK_TRANSPORT_TERMINAL_ATTRIBUTE;
  payload: {
    id: string;
    terminalId: string;
    edgeId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockInterfaceTerminalAttribute {
  type: typeof LOCK_UNLOCK_INTERFACE_TERMINAL_ATTRIBUTE;
  payload: {
    id: string;
    terminalId: string;
    edgeId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockCompositeAttribute {
  type: typeof LOCK_UNLOCK_COMPOSITE_ATTRIBUTE;
  payload: {
    id: string;
    compositeId: string;
    nodeId: string;
    isLocked: boolean;
  };
}

export interface LockUnlockAttributeFinished {
  type: typeof LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export type LockUnlockAttributeUnion =
  | LockUnlockNodeAttribute
  | LockUnlockTransportAttribute
  | LockUnlockInterfaceAttribute
  | LockUnlockNodeTerminalAttribute
  | LockUnlockTransportTerminalAttribute
  | LockUnlockInterfaceTerminalAttribute
  | LockUnlockCompositeAttribute;

export type ProjectActionTypes =
  | FetchingProjectAction
  | SearchProjectAction
  | SearchProjectActionFinished
  | FetchingProjectActionFinished
  | CreatingProjectAction
  | CreatingProjectActionFinished
  | AddNodeAction
  | RemoveNodeAction
  | AddEdgeAction
  | RemoveEdgeAction
  | UpdatePositionAction
  | SetNodeVisibility
  | SetEdgeVisibility
  | SetActiveNode
  | SetActiveEdge
  | SetActiveBlockNode
  | SaveProjectAction
  | SaveProjectActionFinished
  | ChangeSelectedProject
  | UpdateBlockPositionAction
  | ChangeAllNodes
  | ChangeNodePropValue
  | ChangeNodeAttributeValue
  | ChangeTransportAttributeValue
  | ChangeInterfaceAttributeValue
  | ChangeNodeTerminalAttributeValue
  | ChangeTransportTerminalAttributeValue
  | ChangeInterfaceTerminalAttributeValue
  | ChangeCompositeAttributeValue
  | DeleteProjectErrorAction
  | ChangeActiveConnector
  | ExportProjectFileAction
  | ImportProjectAction
  | ExportProjectFileActionFinished
  | ImportProjectActionFinished
  | LockUnlockNode
  | LockUnlockNodeFinished
  | LockUnlockNodeAttribute
  | LockUnlockNodeTerminalAttribute
  | LockUnlockTransportTerminalAttribute
  | LockUnlockInterfaceTerminalAttribute
  | LockUnlockTransportAttribute
  | LockUnlockInterfaceAttribute
  | LockUnlockCompositeAttribute
  | LockUnlockAttributeFinished
  | CommitProject
  | CommitProjectFinished;
