import { FETCHING_USER, FETCHING_USER_SUCCESS_OR_ERROR, DELETE_USER_ERROR, UserActionTypes, UserState } from "./types";

const initialState = {
  fetching: false,
  user: null,
  apiError: [],
} as UserState;

export function userReducer(state = initialState, action: UserActionTypes) {
  if (action.type === FETCHING_USER) {
    return {
      ...state,
      fetching: true,
      user: null,
      apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== FETCHING_USER) : state.apiError,
    };
  }

  if (action.type === FETCHING_USER_SUCCESS_OR_ERROR) {
    return {
      ...state,
      fetching: false,
      user: action.payload.user,
      apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
    };
  }

  if (action.type === DELETE_USER_ERROR) {
    return {
      ...state,
      apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError,
    };
  }

  return state;
}
