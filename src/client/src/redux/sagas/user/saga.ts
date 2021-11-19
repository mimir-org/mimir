import { put, call } from "redux-saga/effects";
import { User } from "../../../models";
import { ApiError, get } from "../../../models/webclient";
import { msalInstance } from "../../../index";
import { FETCHING_USER_SUCCESS_OR_ERROR, UserActionTypes } from "./../../store/user/types";

export function* getUser(action: UserActionTypes) {
  try {
    const account = msalInstance?.getActiveAccount();
    const user: User = {
      username: account.username,
      name: account.name,
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

export function* getUserRoles() {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "user";
    const response = yield call(get, url);

    console.log({ response });
  } catch (error) {
    console.error("Error");
  }
}
