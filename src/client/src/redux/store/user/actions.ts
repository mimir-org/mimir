import { FETCHING_USER, UserActionTypes } from "./types";

export function getUser(): UserActionTypes {
  return {
    type: FETCHING_USER,
    payload: null
  };
}
