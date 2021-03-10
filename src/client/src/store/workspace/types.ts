import { Workspace } from './../../models/workspace'; 

export const FETCHING_WORKSPACE = 'FETCHING_WORKSPACE';
export const FETCHING_WORKSPACE_SUCCESS_OR_ERROR = 'FETCHING_WORKSPACE_SUCCESS_OR_ERROR';

// State types
export interface WorkspaceState {
    fetching: boolean,
    workspace: Workspace | null,
    hasError: boolean,
    errorMsg: string | null
}

// Action types
interface FetchWorkspaceAction {
    type: typeof FETCHING_WORKSPACE,
    payload: WorkspaceState
}
interface FetchWorkspaceActionFinished {
    type: typeof FETCHING_WORKSPACE_SUCCESS_OR_ERROR,
    payload: WorkspaceState
}

export type WorkspaceActionTypes = FetchWorkspaceAction | FetchWorkspaceActionFinished
