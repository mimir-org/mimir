import { FETCHING_USER_ROLE } from "./types";

export function getUserRole() {
  return {
    type: FETCHING_USER_ROLE,
    payload: null,
  };
}
