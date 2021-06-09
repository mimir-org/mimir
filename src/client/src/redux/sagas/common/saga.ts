import { call, put } from "redux-saga/effects";
import { get, GetBadResponseData, ApiError } from "../../../models/webclient";
import {
    FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
    Contractor
} from "../../store/common/types";

export function* getContractors() {
    try {
        const url = process.env.REACT_APP_API_BASE_URL + "common/contractors";
        const response = yield call(get, url);

        // This is a bad request
        if (response.status === 400) {
            const data = GetBadResponseData(response);

            const apiError = {
                key: FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
                errorMessage: data.title,
                errorData: data
            } as ApiError;

            const payload = {
                contractors: [],
                apiError: apiError
            };

            yield put({
                type: FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
                payload: payload,
            });
            return;
        }

        const contractors = response.data as Contractor[];

        const payload = {
            contractors: contractors,
            apiError: null
        };

        yield put({
            type: FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
            payload: payload,
        });
    } catch (error) {
        const apiError = {
            key: FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
            errorMessage: error.message,
            errorData: null
        } as ApiError;

        const payload = {
            contractors: [],
            apiError: apiError
        };

        yield put({
            type: FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
            payload: payload,
        });
    }
}
