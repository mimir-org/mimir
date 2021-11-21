import { FETCHING_USER } from "./types";

export function getUser() {
  return {
    type: FETCHING_USER,
    payload: null,
  };
}
