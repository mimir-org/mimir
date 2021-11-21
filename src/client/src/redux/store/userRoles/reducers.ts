import { FETCHING_USER, FETCHING_USER_SUCCESS_OR_ERROR } from "./types";

const initialState = {
  user: null,
};

export function userRoleReducer(state = initialState, action) {
  // if (action.type === FETCHING_USER_ROLE) {
  //   return {
  //     ...state,
  //     // role: action.payload.role,
  //   };
  // }

  if (action.type === FETCHING_USER_SUCCESS_OR_ERROR) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  return state;
}
