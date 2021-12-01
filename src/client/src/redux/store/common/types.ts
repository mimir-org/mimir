import { CombinedAttributeFilter, CollaborationPartner, EnumBase, ModuleDescription } from "../../../models";
import { ApiError } from "../../../models/webclient";
export const FETCHING_COLLABORATION_PARTNERS = "FETCHING_COLLABORATION_PARTNERS";
export const DELETE_COMMON_ERROR = "DELETE_COMMON_ERROR";
export const FETCHING_COLLABORATION_PARTNERS_SUCCESS_OR_ERROR = "FETCHING_COLLABORATION_PARTNERS_SUCCESS_OR_ERROR";
export const FETCHING_STATUSES = "FETCHING_STATUSES";
export const FETCHING_STATUSES_SUCCESS_OR_ERROR = "FETCHING_STATUSES_SUCCESS_OR_ERROR";
export const FETCHING_COMBINED_ATTRIBUTE_FILTERS = "FETCHING_COMBINED_ATTRIBUTE_FILTERS";
export const FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR = "FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR";
export const FETCHING_PARSERS = "FETCHING_PARSERS";
export const FETCHING_PARSERS_SUCCESS_OR_ERROR = "FETCHING_PARSERS_SUCCESS_OR_ERROR";

// State types
export interface CommonState {
  fetching: boolean;
  collaborationPartners: CollaborationPartner[] | null;
  parsers: ModuleDescription[] | null;
  filters: CombinedAttributeFilter[] | null;
  statuses: EnumBase[] | null;
  apiError: ApiError[];
}

// Action types
interface FetchingCollaboratorPartnersAction {
  type: typeof FETCHING_COLLABORATION_PARTNERS;
  payload: null;
}

interface FetchingCollaboratorPartnersSuccessOrErrorAction {
  type: typeof FETCHING_COLLABORATION_PARTNERS_SUCCESS_OR_ERROR;
  payload: {
    collaborationPartners: CollaborationPartner[];
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

interface FetchingParsersAction {
  type: typeof FETCHING_PARSERS;
  payload: null;
}

interface FetchingParsersSuccessOrErrorAction {
  type: typeof FETCHING_PARSERS_SUCCESS_OR_ERROR;
  payload: {
    parsers: ModuleDescription[];
    apiError: ApiError;
  };
}

export type CommonActionTypes =
  | FetchingCollaboratorPartnersAction
  | FetchingCollaboratorPartnersSuccessOrErrorAction
  | DeleteCommonErrorAction
  | FetchingStatusesAction
  | FetchingStatusesSuccessOrErrorAction
  | FetchingCombinedAttributeFilter
  | FetchingCombinedAttributeFilterFinished
  | FetchingParsersAction
  | FetchingParsersSuccessOrErrorAction;
