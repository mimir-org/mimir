import { FETCHING_WORKSPACE, FETCHING_WORKSPACE_SUCCESS_OR_ERROR, WorkspaceActionTypes, WorkspaceState } from './types';

const initialState: WorkspaceState = {
    fetching: false,
    workspace: null,
    hasError: false,
    errorMsg: null    
}

export function workspaceReducer(state = initialState, action: WorkspaceActionTypes) : WorkspaceState {
    switch (action.type) {
        case FETCHING_WORKSPACE:
        case FETCHING_WORKSPACE_SUCCESS_OR_ERROR:
            return { ...state, fetching: action.payload.fetching, workspace: action.payload.workspace, hasError: action.payload.hasError, errorMsg: action.payload.errorMsg };
            
        default:
            return state;
    }
}