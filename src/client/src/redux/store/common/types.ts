import { ApiError } from "../../../models/webclient";
export const FETCHING_CONTRACTORS = "FETCHING_CONTRACTORS";
export const DELETE_COMMON_ERROR = "DELETE_COMMON_ERROR";
export const FETCHING_CONTRACTORS_SUCCESS_OR_ERROR =
  "FETCHING_CONTRACTORS_SUCCESS_OR_ERROR";

// State types
export interface CommonState {
  fetching: boolean;
  contractors: Contractor[] | null;
  apiError: ApiError[];
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
  payload: {
    contractors: Contractor[];
    apiError: ApiError;
  };
}
interface DeleteCommonErrorAction {
  type: typeof DELETE_COMMON_ERROR;
  payload: {
    key: string;
  };
}

export type CommonActionTypes =
  | FetchingContractorsAction
  | FetchingContractorsSuccessOrErrorAction
  | DeleteCommonErrorAction;
