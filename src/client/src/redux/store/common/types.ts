export const FETCHING_CONTRACTORS = "FETCHING_CONTRACTORS";
export const FETCHING_CONTRACTORS_SUCCESS_OR_ERROR = "FETCHING_CONTRACTORS_SUCCESS_OR_ERROR";

// State types
export interface CommonState {
    fetching: boolean;
    hasError: boolean;
    errorMsg: string | null;
    contractors: Contractor[] | null
}

// Models
export interface Contractor {
    id: string;
    name: string;
    domain: string;
}

// Action types
interface FetchingContractorsAction {
    type: typeof FETCHING_CONTRACTORS;
    payload: null;
}

interface FetchingContractorsSuccessOrErrorAction {
    type: typeof FETCHING_CONTRACTORS_SUCCESS_OR_ERROR;
    payload: CommonState;
}

export type CommonActionTypes =
    | FetchingContractorsAction
    | FetchingContractorsSuccessOrErrorAction;
