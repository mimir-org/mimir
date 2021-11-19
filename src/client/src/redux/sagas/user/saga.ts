import { put } from "redux-saga/effects";
import { User } from "../../../models";
import { ApiError } from "../../../models/webclient";
import { msalInstance } from "../../../index";
import { FETCHING_USER_SUCCESS_OR_ERROR, UserActionTypes } from "./../../store/user/types";
import { TextResources } from "../../../assets/text";

export function* getUser(action: UserActionTypes) {
  try {
    const account = msalInstance?.getActiveAccount();
    console.log({ account });

    const user: User = {
      username: account.username,
      name: account.name,
      role: TextResources.UserMenu_User,
    };

    const payload = {
      user: user,
      apiError: null,
    };

    yield put({
      type: FETCHING_USER_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: FETCHING_USER_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      user: null,
      apiError: apiError,
    };

    yield put({
      type: FETCHING_USER_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}
