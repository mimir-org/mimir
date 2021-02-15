import { FETCHING_TREEVIEW, TreeviewActionTypes, TreeviewState, Node } from './types';

export function getTreeview(node: Node): TreeviewActionTypes {

    return {
        type: FETCHING_TREEVIEW,
        payload: {
            hasError: false,
            errorMsg: null,
            fetching: true,
            root: node
        } as TreeviewState
    }    
}