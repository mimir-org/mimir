import { Project, Node, Edge, NodeType } from "../../../models/project";

export const SAVE_PROJECT = "SAVE_PROJECT";
export const SAVE_PROJECT_SUCCESS_OR_ERROR = "SAVE_PROJECT_SUCCESS_OR_ERROR";
export const FETCHING_PROJECT = "FETCHING_PROJECT";
export const SEARCH_PROJECT = "SEARCH_PROJECT";
export const SEARCH_PROJECT_SUCCESS_OR_ERROR =
  "SEARCH_PROJECT_SUCCESS_OR_ERROR";
export const FETCHING_PROJECT_SUCCESS_OR_ERROR =
  "FETCHING_PROJECT_SUCCESS_OR_ERROR";
export const CREATING_PROJECT = "CREATING_PROJECT";
export const CREATING_PROJECT_SUCCESS_OR_ERROR =
  "CREATING_PROJECT_SUCCESS_OR_ERROR";
export const ADD_NODE = "ADD_NODE";
export const REMOVE_NODE = "REMOVE_NODE";
export const ADD_EDGE = "ADD_EDGE";
export const REMOVE_EDGE = "REMOVE_EDGE";
export const UPDATE_POSITION = "UPDATE_POSITION";
export const CHANGE_NODE_VISIBILITY = "CHANGE_NODE_VISIBILITY";
export const CHANGE_ACTIVE_NODE = "CHANGE_ACTIVE_NODE";
export const CHANGE_SELECTED_PROJECT = "CHANGE_SELECTED_PROJECT";

// State types
export interface ProjectState {
  fetching: boolean;
  creating: boolean;
  project: Project | null;
  hasError: boolean;
  errorMsg: string | null;
  projectList: [] | null;
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
  payload: ProjectState;
}

interface FetchingProjectActionFinished {
  type: typeof FETCHING_PROJECT_SUCCESS_OR_ERROR;
  payload: ProjectState;
}

interface CreatingProjectAction {
  type: typeof CREATING_PROJECT;
  payload: object;
}

interface CreatingProjectActionFinished {
  type: typeof CREATING_PROJECT_SUCCESS_OR_ERROR;
  payload: ProjectState;
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

interface ChangeNodeVisibility {
  type: typeof CHANGE_NODE_VISIBILITY;
  payload: {
    node: Node;
    isAspect: boolean;
    isParent: boolean;
    type: NodeType;
    edgeId: string;
  };
}

interface ChangeActiveNode {
  type: typeof CHANGE_ACTIVE_NODE;
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
  payload: ProjectState;
}

interface ChangeSelectedProject {
  type: typeof CHANGE_SELECTED_PROJECT;
  payload: {
    projectId: string;
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
  | ChangeNodeVisibility
  | ChangeActiveNode
  | SaveProjectAction
  | SaveProjectActionFinished
  | ChangeSelectedProject;
