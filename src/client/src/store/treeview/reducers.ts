import { FETCHING_TREEVIEW, FETCHING_TREEVIEW_SUCCESS_OR_ERROR, TreeviewActionTypes, TreeviewState } from './types';

const initialState: TreeviewState = {
    fetching: false,
    root: null,
    hasError: false,
    errorMsg: null
}

export function treeviewReducer(state = initialState, action: TreeviewActionTypes) : TreeviewState {
    switch (action.type) {
        case FETCHING_TREEVIEW:
        case FETCHING_TREEVIEW_SUCCESS_OR_ERROR:
            return { ...state, fetching: action.payload.fetching, root: action.payload.root, hasError: action.payload.hasError, errorMsg: action.payload.errorMsg };
            
        default:
            return state;
    }
}