import { call, put } from 'redux-saga/effects';
import { FETCHING_TREEVIEW_SUCCESS_OR_ERROR, TreeviewActionTypes, TreeviewState } from './../../store/treeview/types';
import TreeviewDataset from '../../data/TreeviewDataset';


// eslint-disable-next-line require-yield
export function* getTreeview(action: TreeviewActionTypes) {
    try {
        const data = yield call(TreeviewDataset.getAll);
        
        const payload = {
            root: data[0],
            hasError: false,
            errorMsg: null,
            fetching: false
        }

        yield put({
            type: FETCHING_TREEVIEW_SUCCESS_OR_ERROR,
            payload: payload as TreeviewState
        });
    }
    catch(error) {
        console.log('Error getting data from saga: ' + error);

        const payload = {
            root: null,
            hasError: true,
            errorMsg: error,
            fetching: false
        }

        yield put({
            type: FETCHING_TREEVIEW_SUCCESS_OR_ERROR,
            payload: payload as TreeviewState
        });
    }
}