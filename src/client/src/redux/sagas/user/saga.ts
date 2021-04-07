import { put } from "redux-saga/effects";
import {
  FETCHING_USER_SUCCESS_OR_ERROR,
  UserActionTypes,
  UserState  
} from "./../../store/user/types";
import { User } from "../../../models/user";
import { authProvider } from '../../../providers/authProvider';

// eslint-disable-next-line require-yield
export function* getUser(action: UserActionTypes) {
  try {

    const userAccount = yield authProvider.getAccount();
    const user : User = {
        id: userAccount.userName,
        username: userAccount.userName,
        name: userAccount.name,
        settings: new Map<string, string>()
    };

    const payload = {
      fetching: false,
      user: user,
      hasError: false,
      errorMsg: null,
    };

    yield put({
      type: FETCHING_USER_SUCCESS_OR_ERROR,
      payload: payload as UserState,
    });
  } catch (error) {
    console.log("Error getting user data: " + error);

    const payload = {
      fetching: false,
      user: null,
      hasError: true,
      errorMsg: error,
    };

    yield put({
      type: FETCHING_USER_SUCCESS_OR_ERROR,
      payload: payload as UserState,
    });
  }
}
