import {
  CommonActionTypes,
  FETCHING_COLLABORATION_PARTNERS,
  FETCHING_STATUSES,
  DELETE_COMMON_ERROR,
  FETCHING_COMBINED_ATTRIBUTE_FILTERS,
  FETCHING_PARSERS,
} from "./types";

export function getCollaborationPartners(): CommonActionTypes {
  return {
    type: FETCHING_COLLABORATION_PARTNERS,
    payload: null,
  };
}

export function deleteCommonError(key: string) {
  return {
    type: DELETE_COMMON_ERROR,
    payload: {
      key,
    },
  };
}

export function getStatuses(): CommonActionTypes {
  return {
    type: FETCHING_STATUSES,
    payload: null,
  };
}

export function getAttributeFilters(): CommonActionTypes {
  return {
    type: FETCHING_COMBINED_ATTRIBUTE_FILTERS,
    payload: null,
  };
}

export function getParsers(): CommonActionTypes {
  return {
    type: FETCHING_PARSERS,
    payload: null,
  };
}
