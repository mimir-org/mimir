import {
  FETCHING_NODETYPES,
  NodetypesActionTypes,
  NodetypesState,
} from "./types";

export function getnodetypes(): NodetypesActionTypes {
  return {
    type: FETCHING_NODETYPES,
    payload: {
      hasError: false,
      errorMsg: null,
      fetching: true,
      nodetypes: null,
    } as NodetypesState,
  };
}
