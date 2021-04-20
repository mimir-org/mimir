import { call, put } from "redux-saga/effects";
import {
    FETCHING_LIBRARY_SUCCESS_OR_ERROR,
    LibraryActionTypes,
    LibraryState,
} from "../../store/library/types";

import { get } from '../../../models/webclient';

export function* searchLibrary(action: LibraryActionTypes) {
    try {

        const url = process.env.REACT_APP_API_BASE_URL + 'library';
        const response = yield call(get, url);

        const payload = {
            nodes: response.data,
            hasError: false,
            errorMsg: null,
            fetching: false,
        };

        yield put({
            type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
            payload: payload as LibraryState,
        });
    } catch (error) {
        console.log("Error getting library data: " + error);

        const payload = {
            nodes: [],
            hasError: true,
            errorMsg: error,
            fetching: false,
        };

        yield put({
            type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
            payload: payload as LibraryState,
        });
    }
}
