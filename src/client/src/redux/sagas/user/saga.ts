import { put } from "redux-saga/effects";
import { User } from "../../../models";
import { ApiError } from "../../../models/webclient";
import { msalInstance } from "../../../index";
import { FETCHING_USER_SUCCESS_OR_ERROR, UserActionTypes } from "./../../store/user/types";

export function* getUser(action: UserActionTypes) {
    try {
        const account = msalInstance?.getActiveAccount();

        const user: User = {
            username: account.username,
            name: account.name
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
