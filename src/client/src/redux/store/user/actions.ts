import { FETCHING_USER, DELETE_USER_ERROR } from "./types";

export function getUser() {
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
