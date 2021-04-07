import { Project, Node, Edge } from "../../../models/project";

export const FETCHING_PROJECT = "FETCHING_PROJECT";
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

// State types
export interface ProjectState {
  fetching: boolean;
  creating: boolean;
  project: Project | null;
  hasError: boolean;
  errorMsg: string | null;
}

// Action types
interface FetchingProjectAction {
  type: typeof FETCHING_PROJECT;
  payload: string;
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

export type ProjectActionTypes =
  | FetchingProjectAction
  | FetchingProjectActionFinished
  | CreatingProjectAction
  | CreatingProjectActionFinished
  | AddNodeAction
  | RemoveNodeAction
  | AddEdgeAction
  | RemoveEdgeAction
  | UpdatePositionAction;
