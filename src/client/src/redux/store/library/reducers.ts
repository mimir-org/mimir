import {
  FETCHING_LIBRARY,
  FETCHING_LIBRARY_SUCCESS_OR_ERROR,
  LibraryActionTypes,
  LibraryState,
} from "./types";

const initialState: LibraryState = {
  fetching: false,
  nodes: [],
  hasError: false,
  errorMsg: null,
};

export function libraryReducer(
  state = initialState,
  action: LibraryActionTypes
): LibraryState {
  switch (action.type) {
    case FETCHING_LIBRARY:
        return {
            ...state,
            fetching: true,
            nodes: [],
            hasError: false,
            errorMsg: null,
          };
    case FETCHING_LIBRARY_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: action.payload.fetching,
        nodes: action.payload.nodes,
        hasError: action.payload.hasError,
        errorMsg: action.payload.errorMsg,
      };

    default:
      return state;
  }
}
