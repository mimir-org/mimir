import { call, put } from 'redux-saga/effects';
import { FETCHING_WORKSPACE_SUCCESS_OR_ERROR, WorkspaceActionTypes, WorkspaceState } from './../../store/workspace/types';
import WorkspaceDataset from '../../data/WorkspaceDataset';


// eslint-disable-next-line require-yield
export function* getWorkspace(action: WorkspaceActionTypes) {
    try {
        const data = yield call(WorkspaceDataset.getAll);
        
        const payload = {
            workspace: data[0],
            hasError: false,
            errorMsg: null,
            fetching: false
        }

        yield put({
            type: FETCHING_WORKSPACE_SUCCESS_OR_ERROR,
            payload: payload as WorkspaceState
        });
    }
    catch(error) {
        console.log('Error getting graph from saga: ' + error);

        const payload = {
            workspace: null,
            hasError: true,
            errorMsg: error,
            fetching: false
        }

        yield put({
            type: FETCHING_WORKSPACE_SUCCESS_OR_ERROR,
            payload: payload as WorkspaceState
        });
    }
}