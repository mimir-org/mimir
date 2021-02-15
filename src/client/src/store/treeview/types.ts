export const FETCHING_TREEVIEW = 'FETCHING_TREEVIEW';
export const FETCHING_TREEVIEW_SUCCESS_OR_ERROR = 'FETCHING_TREEVIEW_SUCCESS_OR_ERROR';

// State types
export interface TreeviewState {
    fetching: boolean,
    root: Node | null,
    hasError: boolean,
    errorMsg: string | null
}

// Models
export interface Node {
    id: string,
    name: string,
    nodes: Node[] 
}

// Action types
interface FetchTreeviewAction {
    type: typeof FETCHING_TREEVIEW,
    payload: TreeviewState
}

interface FetchTreeviewActionFinished {
    type: typeof FETCHING_TREEVIEW_SUCCESS_OR_ERROR,
    payload: TreeviewState
}

export type TreeviewActionTypes = FetchTreeviewAction | FetchTreeviewActionFinished