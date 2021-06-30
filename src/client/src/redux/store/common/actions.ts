import {
  CommonActionTypes,
  FETCHING_CONTRACTORS,
  FETCHING_STATUSES,
  DELETE_COMMON_ERROR,
} from "./types";

export function getContractors(): CommonActionTypes {
  return {
    type: FETCHING_CONTRACTORS,
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
