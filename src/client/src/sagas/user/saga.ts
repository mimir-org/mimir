import { call, put } from "redux-saga/effects";
import {
  FETCHING_USER_SUCCESS_OR_ERROR,
  UserActionTypes,
  UserState,
  LoginUser,
} from "./../../store/user/types";
import { User } from "../../models/user";
import UserDataset from "../../data/UserDataset";

// eslint-disable-next-line require-yield
export function* getUser(action: UserActionTypes) {
  try {
    const data = (yield call(UserDataset.getAll)) as User[];
    const loginUser = action.payload as LoginUser;
    const currentUser = data.find((x) => x.username === loginUser.username);

    const payload = {
      fetching: false,
      user: currentUser,
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
