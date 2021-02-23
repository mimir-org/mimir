import { FETCHING_WORKSPACE, WorkspaceActionTypes, WorkspaceState } from './types';

export function getWorkspace(): WorkspaceActionTypes {

    return {
        type: FETCHING_WORKSPACE,
        payload: {
            hasError: false,
            errorMsg: null,
            fetching: true,
            workspace: null
        } as WorkspaceState
    }    
}
