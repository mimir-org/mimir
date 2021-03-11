import { FETCHING_USER, UserActionTypes, LoginUser } from "./types";

export function getUser(username: string, password: string): UserActionTypes {
  return {
    type: FETCHING_USER,
    payload: {
      username: username,
      password: password,
    } as LoginUser,
  };
}
