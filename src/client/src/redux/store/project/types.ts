import { Project } from '../../../models/project';

export const FETCHING_PROJECT = "FETCHING_PROJECT";
export const FETCHING_PROJECT_SUCCESS_OR_ERROR =  "FETCHING_PROJECT_SUCCESS_OR_ERROR";
export const CREATING_PROJECT =  "CREATING_PROJECT";
export const CREATING_PROJECT_SUCCESS_OR_ERROR =  "CREATING_PROJECT_SUCCESS_OR_ERROR";

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
  payload: {
      id: string
  }
}

interface FetchingProjectActionFinished {
  type: typeof FETCHING_PROJECT_SUCCESS_OR_ERROR;
  payload: ProjectState;
}

interface CreatingProjectAction {
    type: typeof CREATING_PROJECT;
    payload: object
}

interface CreatingProjectActionFinished {
    type: typeof CREATING_PROJECT_SUCCESS_OR_ERROR;
    payload: ProjectState;
}

export type ProjectActionTypes =
  | FetchingProjectAction
  | FetchingProjectActionFinished
  | CreatingProjectAction
  | CreatingProjectActionFinished;
