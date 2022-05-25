/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from "../../../models/webclient";
import { OffPageObject } from "../../../components/flow/block/nodes/blockNode/helpers/CreateOffPageObject";
import { BlockNodeSize } from "../../../models/project";
import {
  CommitPackage,
  ConnectorVisibility,
  Edge,
  Node,
  Project,
  ProjectConverterAm,
  ProjectItemCm,
  LockAm,
  LockCm,
} from "../../../models";

export const SAVE_PROJECT = "SAVE_PROJECT";
export const CLOSE_PROJECT = "CLOSE_PROJECT";
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
export const DELETE_NODE = "DELETE_NODE";
export const ADD_EDGE = "ADD_EDGE";
export const DELETE_EDGE = "DELETE_EDGE";
export const UPDATE_POSITION = "UPDATE_POSITION";
export const UPDATE_BLOCK_POSITION = "UPDATE_BLOCK_POSITION";
export const UPDATE_BLOCK_SIZE = "UPDATE_BLOCK_SIZE";
export const SET_NODE_VISIBILITY = "SET_NODE_VISIBILITY";
export const SET_BLOCK_NODE_VISIBILITY = "SET_BLOCK_NODE_VISIBILITY";
export const SET_EDGE_VISIBILITY = "SET_EDGE_VISIBILITY";
export const SET_BLOCK_EDGE_VISIBILITY = "SET_BLOCK_EDGE_VISIBILITY";
export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export const REMOVE_SELECTED_NODE = "REMOVE_SELECTED_NODE";
export const SET_SELECTED_BLOCKNODE = "SET_SELECTED_BLOCKNODE";
export const REMOVE_SELECTED_BLOCKNODE = "REMOVE_SELECTED_BLOCKNODE";
export const SET_SELECTED_EDGE = "SET_SELECTED_EDGE";
export const REMOVE_SELECTED_EDGE = "REMOVE_SELECTED_EDGE";
export const SET_LOCATION_NODE_SIZE = "SET_LOCATION_NODE_SIZE";
export const CHANGE_SELECTED_PROJECT = "CHANGE_SELECTED_PROJECT";
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
export const LOCK_ENTITY = "LOCK_ENTITY";
export const LOCK_ENTITY_SUCCESS_OR_ERROR = "LOCK_ENTITY_SUCCESS_OR_ERROR";
export const SET_LOCK_NODE = "SET_LOCK_NODE";
export const SET_LOCK_NODES = "SET_LOCK_NODES";
export const SET_LOCK_EDGE = "SET_LOCK_EDGE";
export const SET_LOCK_EDGES = "SET_LOCK_EDGES";
export const SET_LOCK_ATTRIBUTE = "SET_LOCK_ATTRIBUTE";
export const SET_LOCK_ATTRIBUTES = "SET_LOCK_ATTRIBUTES";
export const CHANGE_NODE_UPDATED = "CHANGE_NODE_UPDATED";
export const UPDATE_NODE = "UPDATE_NODE";
export const UPDATE_EDGE = "UPDATE_EDGE";
export const SET_OFFPAGE_STATUS = "SET_OFFPAGE_STATUS";
export const CREATE_REQUIRED_OFFPAGE_NODE = "CREATE_REQUIRED_OFFPAGE_NODE";
export const CREATE_CONNECTED_OFFPAGE_NODE = "CREATE_CONNECTED_OFFPAGE_NODE";

// State types
export interface ProjectState {
  fetching: boolean;
  creating: boolean;
  isLocking: boolean;
  project: Project;
  projectList: ProjectItemCm[];
  apiError: ApiError[];
}

// Action types
export interface FetchingProjectAction {
  type: typeof FETCHING_PROJECT;
  payload: { id: string; project: Project };
}

export interface CloseProjectAction {
  type: typeof CLOSE_PROJECT;
  payload: null;
}

export interface SearchProjectAction {
  type: typeof SEARCH_PROJECT;
  payload: string;
}

export interface SearchProjectActionFinished {
  type: typeof SEARCH_PROJECT_SUCCESS_OR_ERROR;
  payload: { projectList: []; apiError: ApiError };
}

export interface FetchingProjectActionFinished {
  type: typeof FETCHING_PROJECT_SUCCESS_OR_ERROR;
  payload: { project: Project; apiError: ApiError };
}

export interface CreatingProjectAction {
  type: typeof CREATING_PROJECT;
  payload: Record<string, unknown>;
}

export interface CreatingProjectActionFinished {
  type: typeof CREATING_PROJECT_SUCCESS_OR_ERROR;
  payload: { project: Project; apiError: ApiError };
}

export interface AddNodeAction {
  type: typeof ADD_NODE;
  payload: Node;
}

export interface DeleteNodeAction {
  type: typeof DELETE_NODE;
  payload: string;
}

export interface AddEdgeAction {
  type: typeof ADD_EDGE;
  payload: Edge;
}

export interface DeleteEdgeAction {
  type: typeof DELETE_EDGE;
  payload: string;
}

export interface UpdatePositionAction {
  type: typeof UPDATE_POSITION;
  payload: { nodeId: string; x: number; y: number };
}
export interface UpdateBlockPositionAction {
  type: typeof UPDATE_BLOCK_POSITION;
  payload: { nodeId: string; x: number; y: number };
}

export interface UpdateBlockSizeAction {
  type: typeof UPDATE_BLOCK_SIZE;
  payload: { nodeId: string; size: BlockNodeSize };
}

export interface SetNodeVisibility {
  type: typeof SET_NODE_VISIBILITY;
  payload: { node: Node };
}

export interface SetBlockNodeVisibility {
  type: typeof SET_BLOCK_NODE_VISIBILITY;
  payload: { node: Node; blockHidden: boolean };
}

export interface SetEdgeVisibility {
  type: typeof SET_EDGE_VISIBILITY;
  payload: { edgeId: string; hidden: boolean };
}

export interface SetBlockEdgeVisibility {
  type: typeof SET_BLOCK_EDGE_VISIBILITY;
  payload: { edgeId: string; blockHidden: boolean };
}

export interface SetLocationNodeSize {
  type: typeof SET_LOCATION_NODE_SIZE;
  payload: { nodeId: string; key: string; value: number };
}

export interface SetSelectedNode {
  type: typeof SET_SELECTED_NODE;
  payload: { nodeId: string };
}

export interface RemoveSelectedNode {
  type: typeof REMOVE_SELECTED_NODE;
  payload: null;
}

export interface SetSelectedEdge {
  type: typeof SET_SELECTED_EDGE;
  payload: { edgeId: string };
}

export interface RemoveSelectedEdge {
  type: typeof REMOVE_SELECTED_EDGE;
  payload: null;
}

export interface SetSelectedBlockNode {
  type: typeof SET_SELECTED_BLOCKNODE;
  payload: { nodeId: string };
}

export interface RemoveSelectedBlockNode {
  type: typeof REMOVE_SELECTED_BLOCKNODE;
  payload: null;
}

export interface SaveProjectAction {
  type: typeof SAVE_PROJECT;
  payload: { project: Project };
}

export interface SaveProjectActionFinished {
  type: typeof SAVE_PROJECT_SUCCESS_OR_ERROR;
  payload: { apiError: ApiError };
}

export interface ChangeSelectedProject {
  type: typeof CHANGE_SELECTED_PROJECT;
  payload: { projectId: string };
}

export interface ChangeNodePropValue {
  type: typeof CHANGE_NODE_PROP_VALUE;
  payload: { nodeId: string; propName: string; propValue: any };
}

export interface ChangeNodeAttributeValue {
  type: typeof CHANGE_NODE_ATTRIBUTE_VALUE;
  payload: { id: string; value: string; unitId: string; nodeId: string };
}

export interface ChangeTransportPropValue {
  type: typeof CHANGE_TRANSPORT_PROP_VALUE;
  payload: { edgeId: string; propName: string; propValue: any };
}

export interface ChangeTransportAttributeValue {
  type: typeof CHANGE_TRANSPORT_ATTRIBUTE_VALUE;
  payload: { id: string; value: string; unitId: string; edgeId: string };
}

export interface ChangeInterfacePropValue {
  type: typeof CHANGE_INTERFACE_PROP_VALUE;
  payload: { edgeId: string; propName: string; propValue: any };
}
export interface ChangeInterfaceAttributeValue {
  type: typeof CHANGE_INTERFACE_ATTRIBUTE_VALUE;
  payload: { id: string; value: string; unitId: string; edgeId: string };
}
export interface ChangeNodeTerminalAttributeValue {
  type: typeof CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE;
  payload: { id: string; nodeId: string; value: string; unitId: string; terminalId: string };
}

export interface ChangeTransportTerminalAttributeValue {
  type: typeof CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE;
  payload: { id: string; edgeId: string; value: string; unitId: string; terminalId: string };
}

export interface ChangeInterfaceTerminalAttributeValue {
  type: typeof CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE;
  payload: { id: string; edgeId: string; value: string; unitId: string; terminalId: string };
}

export interface ChangeSimpleAttributeValue {
  type: typeof CHANGE_SIMPLE_ATTRIBUTE_VALUE;
  payload: { id: string; value: string; unitId: string; nodeId: string; simpleId: string };
}

export interface DeleteProjectErrorAction {
  type: typeof DELETE_PROJECT_ERROR;
  payload: { key: string };
}

export interface ChangeActiveConnector {
  type: typeof CHANGE_ACTIVE_CONNECTOR;
  payload: { nodeId: string; connectorId: string; connectorVisibility: ConnectorVisibility };
}

export interface ExportProjectFileAction {
  type: typeof EXPORT_PROJECT_TO_FILE;
  payload: ProjectConverterAm;
}

export interface ImportProjectAction {
  type: typeof IMPORT_PROJECT;
  payload: { file: File; parserId: string };
}

export interface ExportProjectFileActionFinished {
  type: typeof EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR;
  payload: { apiError: ApiError };
}
export interface ImportProjectActionFinished {
  type: typeof IMPORT_PROJECT_SUCCESS_OR_ERROR;
  payload: { apiError: ApiError };
}

export interface CommitProject {
  type: typeof COMMIT_PROJECT;
  payload: CommitPackage;
}

export interface CommitProjectFinished {
  type: typeof COMMIT_PROJECT_SUCCESS_OR_ERROR;
  payload: { apiError: ApiError };
}

export interface LockEntity {
  type: typeof LOCK_ENTITY;
  payload: LockAm;
}

export interface LockEntityFinished {
  type: typeof LOCK_ENTITY_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface SetLockNode {
  type: typeof SET_LOCK_NODE;
  payload: LockCm;
}

export interface SetLockNodes {
  type: typeof SET_LOCK_NODES;
  payload: LockCm[];
}

export interface SetLockEdge {
  type: typeof SET_LOCK_EDGE;
  payload: LockCm;
}

export interface SetLockEdges {
  type: typeof SET_LOCK_EDGES;
  payload: LockCm[];
}

export interface SetLockAttribute {
  type: typeof SET_LOCK_ATTRIBUTE;
  payload: LockCm;
}

export interface SetLockAttributes {
  type: typeof SET_LOCK_ATTRIBUTES;
  payload: LockCm[];
}

export interface ChangeNodeUpdated {
  type: typeof CHANGE_NODE_UPDATED;
  payload: { nodeId: string; updated: Date; userName: string };
}

export interface CreateSubProject {
  type: typeof CREATING_SUB_PROJECT;
  payload: { fromProjectId: string; name: string; description: string; nodes: string[]; edges: string[] };
}
export interface CreateSubProjectFinished {
  type: typeof CREATING_SUB_PROJECT_SUCCESS_OR_ERROR;
  payload: { apiError: ApiError };
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
  payload: { nodeId: string; connectorId: string; isRequired: boolean };
}

export interface CreateRequiredOffPageNode {
  type: typeof CREATE_REQUIRED_OFFPAGE_NODE;
  payload: { nodeId: string; connectorId: string; isRequired: boolean; offPageObject: OffPageObject };
}

export interface CreateConnectedOffPageNode {
  type: typeof CREATE_CONNECTED_OFFPAGE_NODE;
  payload: { offPageObject: OffPageObject };
}

export type ProjectActionTypes =
  | FetchingProjectAction
  | SearchProjectAction
  | SearchProjectActionFinished
  | FetchingProjectActionFinished
  | CreatingProjectAction
  | CreatingProjectActionFinished
  | AddNodeAction
  | DeleteNodeAction
  | AddEdgeAction
  | DeleteEdgeAction
  | UpdatePositionAction
  | UpdateBlockSizeAction
  | SetNodeVisibility
  | SetBlockNodeVisibility
  | SetEdgeVisibility
  | SetBlockEdgeVisibility
  | SetSelectedNode
  | RemoveSelectedNode
  | SetSelectedEdge
  | RemoveSelectedEdge
  | SetSelectedBlockNode
  | RemoveSelectedBlockNode
  | SetLocationNodeSize
  | SaveProjectAction
  | SaveProjectActionFinished
  | CloseProjectAction
  | ChangeSelectedProject
  | UpdateBlockPositionAction
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
  | LockEntity
  | LockEntityFinished
  | SetLockNode
  | SetLockNodes
  | SetLockEdge
  | SetLockEdges
  | SetLockAttribute
  | SetLockAttributes
  | CommitProject
  | CommitProjectFinished
  | ChangeNodeUpdated
  | CreateSubProject
  | CreateSubProjectFinished
  | UpdateNodeAction
  | UpdateEdgeAction
  | SetOffPageStatus
  | CreateRequiredOffPageNode
  | CreateConnectedOffPageNode;
