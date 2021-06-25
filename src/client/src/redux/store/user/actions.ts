import { FETCHING_USER, DELETE_USER_ERROR, UserActionTypes } from "./types";

export function getUser(): UserActionTypes {
  return {
    type: FETCHING_USER,
    payload: null,
  };
}

export function deleteUserError(key: string) {
  return {
    type: DELETE_USER_ERROR,
    payload: {
      key,
    },
  };
}
