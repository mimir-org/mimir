import { call, put } from "redux-saga/effects";
import {
    FETCHING_LIBRARY_SUCCESS_OR_ERROR,
    LibraryActionTypes,
} from "../../store/library/types";

import { get, ApiError, GetBadResponseData } from "../../../models/webclient";

export function* searchLibrary(action: LibraryActionTypes) {
    try {
        const url = process.env.REACT_APP_API_BASE_URL + "library?name=" + action.payload;
        const response = yield call(get, url);

        // This is a bad request
        if (response.status === 400) {
            const data = GetBadResponseData(response);

            const apiError = {
                key: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
                errorMessage: data.title,
                errorData: data
            } as ApiError;

            const payload = {
                nodes: [],
                apiError: apiError
            };

            yield put({
                type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
                payload: payload,
            });
            return;
        }

        const payload = {
            nodes: response.data,
            apiError: null
        };

        yield put({
            type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
            payload: payload,
        });
    } catch (error) {
        const apiError = {
            key: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
            errorMessage: error.message,
            errorData: null
        } as ApiError;

        const payload = {
            nodes: [],
            apiError: apiError
        };

        yield put({
            type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
            payload: payload,
        });
    }
}
