import { CombinedAttributeFilter, EnumBase } from "../../../models";
import { ApiError } from "../../../models/webclient";
export const FETCHING_CONTRACTORS = "FETCHING_CONTRACTORS";
export const DELETE_COMMON_ERROR = "DELETE_COMMON_ERROR";
export const FETCHING_CONTRACTORS_SUCCESS_OR_ERROR = "FETCHING_CONTRACTORS_SUCCESS_OR_ERROR";
export const FETCHING_STATUSES = "FETCHING_STATUSES";
export const FETCHING_STATUSES_SUCCESS_OR_ERROR = "FETCHING_STATUSES_SUCCESS_OR_ERROR";
export const FETCHING_COMBINED_ATTRIBUTE_FILTERS = "FETCHING_COMBINED_ATTRIBUTE_FILTERS";
export const FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR = "FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR";

// State types
export interface CommonState {
  fetching: boolean;
  contractors: Contractor[] | null;
  filters: CombinedAttributeFilter[] | null;
  statuses: EnumBase[] | null;
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

interface FetchingStatusesAction {
  type: typeof FETCHING_STATUSES;
  payload: null;
}

interface FetchingStatusesSuccessOrErrorAction {
  type: typeof FETCHING_STATUSES_SUCCESS_OR_ERROR;
  payload: {
    statuses: EnumBase[];
    apiError: ApiError;
  };
}
interface DeleteCommonErrorAction {
  type: typeof DELETE_COMMON_ERROR;
  payload: {
    key: string;
  };
}
interface FetchingCombinedAttributeFilter {
  type: typeof FETCHING_COMBINED_ATTRIBUTE_FILTERS;
  payload: null;
}
interface FetchingCombinedAttributeFilterFinished {
  type: typeof FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR;
  payload: {
    filters: CombinedAttributeFilter[];
    apiError: ApiError;
  };
}

export type CommonActionTypes =
  | FetchingContractorsAction
  | FetchingContractorsSuccessOrErrorAction
  | DeleteCommonErrorAction
  | FetchingStatusesAction
  | FetchingStatusesSuccessOrErrorAction
  | FetchingCombinedAttributeFilter
  | FetchingCombinedAttributeFilterFinished;
