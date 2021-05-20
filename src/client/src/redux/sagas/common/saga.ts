import { call, put } from "redux-saga/effects";
import { get } from "../../../models/webclient";
import {
    FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
    CommonState,
    Contractor
} from "../../store/common/types";

export function* getContractors() {
    try {
        const url = process.env.REACT_APP_API_BASE_URL + "common/contractors";
        const response = yield call(get, url);
        const contractors = response.data as Contractor[];

        const payload = {
            fetching: false,
            hasError: false,
            errorMsg: null,
            contractors: contractors
        };

        yield put({
            type: FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
            payload: payload as CommonState,
        });
    } catch (error) {
        const payload = {
            fetching: false,
            hasError: true,
            errorMsg: error.message,
            contractors: []
        };

        yield put({
            type: FETCHING_CONTRACTORS_SUCCESS_OR_ERROR,
            payload: payload as CommonState,
        });
    }
}
