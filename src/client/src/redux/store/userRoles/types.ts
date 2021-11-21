import { User } from "../../../models";

export const FETCHING_USER_ROLE_SUCCESS_OR_ERROR = "FETCHING_USER_ROLE_SUCCESS_OR_ERROR";
export const FETCHING_USER_ROLE = "FETCHING_USER_ROLE";

export interface FetchingUserRole {
  type: typeof FETCHING_USER_ROLE;
  payload: null;
}

export interface FetchingUserRoleActionFinished {
  type: typeof FETCHING_USER_ROLE_SUCCESS_OR_ERROR;
  payload: { user: User };
}
