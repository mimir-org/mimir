import { Workspace, FETCHING_WORKSPACE, WorkspaceActionTypes, WorkspaceState } from './types';

export function getWorkspace(workspace: Workspace): WorkspaceActionTypes {

    return {
        type: FETCHING_WORKSPACE,
        payload: {
            hasError: false,
            errorMsg: null,
            fetching: true,
            workspace: workspace
        } as WorkspaceState
    }    
}
