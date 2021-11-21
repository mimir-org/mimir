import { User } from "../../../models";

export const FETCHING_USER_SUCCESS_OR_ERROR = "FETCHING_USER_SUCCESS_OR_ERROR";
export const FETCHING_USER = "FETCHING_USER";

export interface FetchingUser {
  type: typeof FETCHING_USER;
  payload: null;
}

export interface FetchingUserActionFinished {
  type: typeof FETCHING_USER_SUCCESS_OR_ERROR;
  payload: { user: User };
}
