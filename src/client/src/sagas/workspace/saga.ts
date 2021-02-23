import { call, put } from 'redux-saga/effects';
import { FETCHING_WORKSPACE_SUCCESS_OR_ERROR, WorkspaceActionTypes, WorkspaceState } from './../../store/workspace/types';
import { Workspace } from '../../models/workspace';
import WorkspaceDataset from '../../data/WorkspaceDataset';

import { get } from './../../models/webclient';


// eslint-disable-next-line require-yield
export function* getWorkspace(action: WorkspaceActionTypes) {
    try {

        // const response = yield call(get, process.env.REACT_APP_API_BASE_URL + 'todos');
        

        const data = yield call(WorkspaceDataset.get);
        const workspace = data as Workspace;
                
        const payload = {
            workspace: workspace,
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