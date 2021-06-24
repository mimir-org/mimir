import {
  CommonActionTypes,
  FETCHING_CONTRACTORS,
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
