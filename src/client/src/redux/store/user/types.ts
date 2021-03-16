import { User } from "./../../../models/user";

export const FETCHING_USER = "FETCHING_USER";
export const FETCHING_USER_SUCCESS_OR_ERROR = "FETCHING_USER_SUCCESS_OR_ERROR";

// State types
export interface UserState {
  fetching: boolean;
  user: User | null;
  hasError: boolean;
  errorMsg: string | null;
}

export interface LoginUser {
  username: string;
  password: string;
}

// Action types
interface FetchUserAction {
  type: typeof FETCHING_USER;
  payload: LoginUser;
}
interface FetchUserActionFinished {
  type: typeof FETCHING_USER_SUCCESS_OR_ERROR;
  payload: UserState;
}

export type UserActionTypes = FetchUserAction | FetchUserActionFinished;
