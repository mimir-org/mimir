import { User } from "./../../../models";
import { ApiError } from "./../../../models/webclient";

export const FETCHING_USER = "FETCHING_USER";
export const FETCHING_USER_SUCCESS_OR_ERROR = "FETCHING_USER_SUCCESS_OR_ERROR";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";

// State types
export interface UserState {
  fetching: boolean;
  user: User | null;
  apiError: ApiError[];
}
interface FetchingUserAction {
  type: typeof FETCHING_USER;
  payload: null;
}

interface FetchingUserActionFinished {
  type: typeof FETCHING_USER_SUCCESS_OR_ERROR;
  payload: {
    user: User;
    apiError: ApiError;
  };
}

interface DeleteUserErrorAction {
  type: typeof DELETE_USER_ERROR;
  payload: {
    key: string;
  };
}

export type UserActionTypes = FetchingUserAction | FetchingUserActionFinished | DeleteUserErrorAction;
