import { CommitPackage, Edge, Node, Project, ProjectConverterAm, ProjectFileAm } from "../../../models";
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
export const CREATING_SUB_PROJECT = "CREATING_SUB_PROJECT";
export const CREATING_SUB_PROJECT_SUCCESS_OR_ERROR = "CREATING_SUB_PROJECT_SUCCESS_OR_ERROR";
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
export const SET_LOCATION_NODE_SIZE = "SET_LOCATION_NODE_SIZE";
export const CHANGE_SELECTED_PROJECT = "CHANGE_SELECTED_PROJECT";
export const CHANGE_ALL_NODES = "CHANGE_ALL_NODES";
export const CHANGE_NODE_PROP_VALUE = "CHANGE_NODE_PROP_VALUE";
export const CHANGE_TRANSPORT_PROP_VALUE = "CHANGE_TRANSPORT_PROP_VALUE";
export const CHANGE_INTERFACE_PROP_VALUE = "CHANGE_INTERFACE_PROP_VALUE";
export const CHANGE_NODE_ATTRIBUTE_VALUE = "CHANGE_NODE_ATTRIBUTE_VALUE";
export const CHANGE_TRANSPORT_ATTRIBUTE_VALUE = "CHANGE_TRANSPORT_ATTRIBUTE_VALUE";
export const CHANGE_INTERFACE_ATTRIBUTE_VALUE = "CHANGE_INTERFACE_ATTRIBUTE_VALUE";
export const CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE = "CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE";
export const CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE = "CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE";
export const CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE = "CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE";
export const CHANGE_SIMPLE_ATTRIBUTE_VALUE = "CHANGE_SIMPLE_ATTRIBUTE_VALUE";
export const DELETE_PROJECT_ERROR = "DELETE_PROJECT_ERROR";
export const CHANGE_ACTIVE_CONNECTOR = "CHANGE_ACTIVE_CONNECTOR";
export const EXPORT_PROJECT_TO_FILE = "EXPORT_PROJECT_TO_FILE";
export const EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR = "EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR";
export const IMPORT_PROJECT = "IMPORT_PROJECT";
export const IMPORT_PROJECT_SUCCESS_OR_ERROR = "IMPORT_PROJECT_SUCCESS_OR_ERROR";
export const LOCK_NODE = "LOCK_NODE";
export const LOCK_NODE_SUCCESS_OR_ERROR = "LOCK_NODE_SUCCESS_OR_ERROR";
export const LOCK_EDGE = "LOCK_EDGE";
export const LOCK_EDGE_SUCCESS_OR_ERROR = "LOCK_NODE_SUCCESS_OR_ERROR";
export const LOCK_ATTRIBUTE = "LOCK_ATTRIBUTE";
export const LOCK_ATTRIBUTE_SUCCESS_OR_ERROR = "LOCK_ATTRIBUTE_SUCCESS_OR_ERROR";
export const SET_LOCK_NODE = "SET_LOCK_NODE";
export const SET_LOCK_EDGE = "SET_LOCK_EDGE";
export const SET_LOCK_NODE_ATTRIBUTE = "SET_LOCK_NODE_ATTRIBUTE";
export const SET_LOCK_TRANSPORT_ATTRIBUTE = "SET_LOCK_TRANSPORT_ATTRIBUTE";
export const SET_LOCK_INTERFACE_ATTRIBUTE = "SET_LOCK_INTERFACE_ATTRIBUTE";
export const SET_LOCK_SIMPLE_ATTRIBUTE = "SET_LOCK_SIMPLE_ATTRIBUTE";
export const SET_LOCK_NODE_TERMINAL_ATTRIBUTE = "SET_LOCK_NODE_TERMINAL_ATTRIBUTE";
export const SET_LOCK_TRANSPORT_TERMINAL_ATTRIBUTE = "SET_LOCK_TRANSPORT_TERMINAL_ATTRIBUTE";
export const SET_LOCK_INTERFACE_TERMINAL_ATTRIBUTE = "SET_LOCK_INTERFACE_TERMINAL_ATTRIBUTE";
export const CHANGE_NODE_UPDATED = "CHANGE_NODE_UPDATED";
export const UPDATE_NODE = "UPDATE_NODE";
export const UPDATE_EDGE = "UPDATE_EDGE";
export const SET_OFFPAGE_STATUS = "SET_OFFPAGE_STATUS";

// State types
export interface ProjectState {
  fetching: boolean;
  creating: boolean;
  project: Project;
  projectList: [];
  apiError: ApiError[];
}

// Action types
export interface FetchingProjectAction {
  type: typeof FETCHING_PROJECT;
  payload: {
    id: string;
    project: Project;
  };
}

export interface SearchProjectAction {
  type: typeof SEARCH_PROJECT;
  payload: string;
}

export interface SearchProjectActionFinished {
  type: typeof SEARCH_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    projectList: [];
    apiError: ApiError;
  };
}

export interface FetchingProjectActionFinished {
  type: typeof FETCHING_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    project: Project;
    apiError: ApiError;
  };
}

export interface CreatingProjectAction {
  type: typeof CREATING_PROJECT;
  payload: Record<string, unknown>;
}

export interface CreatingProjectActionFinished {
  type: typeof CREATING_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    project: Project;
    apiError: ApiError;
  };
}

export interface AddNodeAction {
  type: typeof ADD_NODE;
  payload: Node;
}

export interface RemoveNodeAction {
  type: typeof REMOVE_NODE;
  payload: string;
}

export interface AddEdgeAction {
  type: typeof ADD_EDGE;
  payload: Edge;
}

export interface RemoveEdgeAction {
  type: typeof REMOVE_EDGE;
  payload: string;
}

export interface UpdatePositionAction {
  type: typeof UPDATE_POSITION;
  payload: {
    nodeId: string;
    x: number;
    y: number;
  };
}
export interface UpdateBlockPositionAction {
  type: typeof UPDATE_BLOCK_POSITION;
  payload: {
    nodeId: string;
    x: number;
    y: number;
  };
}

export interface SetNodeVisibility {
  type: typeof SET_NODE_VISIBILITY;
  payload: {
    node: Node;
    isParent: boolean;
  };
}

export interface SetEdgeVisibility {
  type: typeof SET_EDGE_VISIBILITY;
  payload: {
    edge: Edge;
    isHidden: boolean;
  };
}

export interface SetLocationNodeSize {
  type: typeof SET_LOCATION_NODE_SIZE;
  payload: {
    nodeId: string;
    key: string;
    value: number;
  };
}

export interface SetActiveNode {
  type: typeof SET_ACTIVE_NODE;
  payload: {
    nodeId: string;
    isActive: boolean;
  };
}

export interface SetActiveEdge {
  type: typeof SET_ACTIVE_EDGE;
  payload: {
    edgeId: string;
    isActive: boolean;
  };
}

export interface SetActiveBlockNode {
  type: typeof SET_ACTIVE_BLOCKNODE;
  payload: {
    nodeId: string;
  };
}

export interface SaveProjectAction {
  type: typeof SAVE_PROJECT;
  payload: {
    project: Project;
  };
}

export interface SaveProjectActionFinished {
  type: typeof SAVE_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    project: Project;
    apiError: ApiError;
  };
}

export interface ChangeSelectedProject {
  type: typeof CHANGE_SELECTED_PROJECT;
  payload: {
    projectId: string;
  };
}

export interface ChangeAllNodes {
  type: typeof CHANGE_ALL_NODES;
  payload: {
    visible: boolean;
  };
}

export interface ChangeNodePropValue {
  type: typeof CHANGE_NODE_PROP_VALUE;
  payload: {
    nodeId: string;
    propName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export interface ChangeTransportPropValue {
  type: typeof CHANGE_TRANSPORT_PROP_VALUE;
  payload: {
    edgeId: string;
    propName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propValue: any;
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

export interface ChangeInterfacePropValue {
  type: typeof CHANGE_INTERFACE_PROP_VALUE;
  payload: {
    edgeId: string;
    propName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propValue: any;
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
export interface ChangeSimpleAttributeValue {
  type: typeof CHANGE_SIMPLE_ATTRIBUTE_VALUE;
  payload: {
    id: string;
    value: string;
    unitId: string;
    nodeId: string;
    simpleId: string;
  };
}

export interface DeleteProjectErrorAction {
  type: typeof DELETE_PROJECT_ERROR;
  payload: {
    key: string;
  };
}

export interface ChangeActiveConnector {
  type: typeof CHANGE_ACTIVE_CONNECTOR;
  payload: {
    nodeId: string;
    connectorId: string;
    visible: boolean;
    inputOrder: number;
    outputOrder: number;
  };
}
export interface ExportProjectFileAction {
  type: typeof EXPORT_PROJECT_TO_FILE;
  payload: ProjectConverterAm;
}
export interface ImportProjectAction {
  type: typeof IMPORT_PROJECT;
  payload: ProjectFileAm;
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

export interface LockNode {
  type: typeof LOCK_NODE;
  payload: {
    id: string;
    projectId: string;
    isLocked: boolean;
  };
}

export interface LockNodeFinished {
  type: typeof LOCK_NODE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface LockEdge {
  type: typeof LOCK_EDGE;
  payload: {
    id: string;
    projectId: string;
    isLocked: boolean;
  };
}

export interface LockEdgeFinished {
  type: typeof LOCK_EDGE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface LockAttribute {
  type: typeof LOCK_ATTRIBUTE;
  payload: {
    id: string;
    projectId: string;
    isLocked: boolean;
  };
}

export interface LockAttributeFinished {
  type: typeof LOCK_ATTRIBUTE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface SetLockNode {
  type: typeof SET_LOCK_NODE;
  payload: {
    id: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockEdge {
  type: typeof SET_LOCK_EDGE;
  payload: {
    id: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockNodeAttribute {
  type: typeof SET_LOCK_NODE_ATTRIBUTE;
  payload: {
    id: string;
    nodeId: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockTransportAttribute {
  type: typeof SET_LOCK_TRANSPORT_ATTRIBUTE;
  payload: {
    id: string;
    transportId: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockInterfaceAttribute {
  type: typeof SET_LOCK_INTERFACE_ATTRIBUTE;
  payload: {
    id: string;
    interfaceId: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockNodeTerminalAttribute {
  type: typeof SET_LOCK_NODE_TERMINAL_ATTRIBUTE;
  payload: {
    id: string;
    terminalId: string;
    nodeId: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockTransportTerminalAttribute {
  type: typeof SET_LOCK_TRANSPORT_TERMINAL_ATTRIBUTE;
  payload: {
    id: string;
    terminalId: string;
    transportId: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockInterfaceTerminalAttribute {
  type: typeof SET_LOCK_INTERFACE_TERMINAL_ATTRIBUTE;
  payload: {
    id: string;
    terminalId: string;
    interfaceId: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface SetLockSimpleAttribute {
  type: typeof SET_LOCK_SIMPLE_ATTRIBUTE;
  payload: {
    id: string;
    simpleId: string;
    nodeId: string;
    isLocked: boolean;
    isLockedStatusBy: string;
    isLockedStatusDate: string;
  };
}

export interface ChangeNodeUpdated {
  type: typeof CHANGE_NODE_UPDATED;
  payload: {
    nodeId: string;
    updated: Date;
    userName: string;
  };
}

export interface CreateSubProject {
  type: typeof CREATING_SUB_PROJECT;
  payload: {
    fromProjectId: string;
    name: string;
    description: string;
    nodes: string[];
    edges: string[];
  };
}
export interface CreateSubProjectFinished {
  type: typeof CREATING_SUB_PROJECT_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface UpdateNodeAction {
  type: typeof UPDATE_NODE;
  payload: Node;
}
export interface UpdateEdgeAction {
  type: typeof UPDATE_EDGE;
  payload: Edge;
}
export interface SetOffPageStatus {
  type: typeof SET_OFFPAGE_STATUS;
  payload: {
    nodeId: string;
    connectorId: string;
    isRequired: boolean;
  };
}

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
  | SetLocationNodeSize
  | SaveProjectAction
  | SaveProjectActionFinished
  | ChangeSelectedProject
  | UpdateBlockPositionAction
  | ChangeAllNodes
  | ChangeNodePropValue
  | ChangeNodeAttributeValue
  | ChangeTransportPropValue
  | ChangeTransportAttributeValue
  | ChangeInterfacePropValue
  | ChangeInterfaceAttributeValue
  | ChangeNodeTerminalAttributeValue
  | ChangeTransportTerminalAttributeValue
  | ChangeInterfaceTerminalAttributeValue
  | ChangeSimpleAttributeValue
  | DeleteProjectErrorAction
  | ChangeActiveConnector
  | ExportProjectFileAction
  | ImportProjectAction
  | ExportProjectFileActionFinished
  | ImportProjectActionFinished
  | LockNode
  | LockNodeFinished
  | SetLockNodeAttribute
  | LockEdge
  | LockEdgeFinished
  | SetLockNode
  | SetLockEdge
  | SetLockNodeTerminalAttribute
  | SetLockTransportTerminalAttribute
  | SetLockInterfaceTerminalAttribute
  | SetLockTransportAttribute
  | SetLockInterfaceAttribute
  | SetLockSimpleAttribute
  | LockAttributeFinished
  | CommitProject
  | CommitProjectFinished
  | ChangeNodeUpdated
  | CreateSubProject
  | CreateSubProjectFinished
  | UpdateNodeAction
  | UpdateEdgeAction
  | SetOffPageStatus;
