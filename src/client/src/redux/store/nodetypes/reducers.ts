import {
  FETCHING_NODETYPES,
  FETCHING_NODETYPES_SUCCESS_OR_ERROR,
  NodetypesActionTypes,
  NodetypesState,
} from "./types";

const initialState: NodetypesState = {
  fetching: false,
  nodetypes: null, // blir en liste med typer
  hasError: false,
  errorMsg: null,
};

export function nodetypeReducer(
  state = initialState,
  action: NodetypesActionTypes
): NodetypesState {
  switch (action.type) {
    case FETCHING_NODETYPES:
    case FETCHING_NODETYPES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: action.payload.fetching,
        nodetypes: action.payload.nodetypes,
        hasError: action.payload.hasError,
        errorMsg: action.payload.errorMsg,
      };

    default:
      return state;
  }
}
