export const FETCHING_NODETYPES = 'FETCHING_NODETYPES';
export const FETCHING_NODETYPES_SUCCESS_OR_ERROR = 'FETCHING_NODETYPES_SUCCESS_OR_ERROR';

// Models
export interface Nodetype {
    id: number,
    name: string,
    color: string
}

// State types
export interface NodetypesState {
    fetching: boolean,
    nodetypes: Nodetype[] | null,
    hasError: boolean,
    errorMsg: string | null
}

// Action types
interface FetchNodetypesAction {
    type: typeof FETCHING_NODETYPES,
    payload: NodetypesState
}

interface FetcNodetypesActionFinished {
    type: typeof FETCHING_NODETYPES_SUCCESS_OR_ERROR,
    payload: NodetypesState
}

export type NodetypesActionTypes = FetchNodetypesAction | FetcNodetypesActionFinished
