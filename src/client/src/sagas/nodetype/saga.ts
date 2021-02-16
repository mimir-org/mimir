import { call, put } from 'redux-saga/effects';
import { FETCHING_NODETYPES_SUCCESS_OR_ERROR, NodetypesActionTypes, NodetypesState } from './../../store/nodetypes/types';
import NodeTypeDataset from '../../data/NodeTypeDataset';


// eslint-disable-next-line require-yield
export function* getNodetypes(action: NodetypesActionTypes) {
    try {
        const data = yield call(NodeTypeDataset.getAll);
        
        const payload = {
            nodetypes: data,
            hasError: false,
            errorMsg: null,
            fetching: false
        }

        yield put({
            type: FETCHING_NODETYPES_SUCCESS_OR_ERROR,
            payload: payload as NodetypesState
        });
    }
    catch(error) {
        console.log('Error getting nodetypes from saga: ' + error);

        const payload = {
            nodetypes: null,
            hasError: true,
            errorMsg: error,
            fetching: false
        }

        yield put({
            type: FETCHING_NODETYPES_SUCCESS_OR_ERROR,
            payload: payload as NodetypesState
        });
    }
}