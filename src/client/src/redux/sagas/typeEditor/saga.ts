import { call, put } from "redux-saga/effects";
import {
    FETCHING_INITIAL_SUCCESS_OR_ERROR,
    FETCHING_RDS_SUCCESS_OR_ERROR,
    FETCHING_TERMINALS_SUCCESS_OR_ERROR,
    FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
    CREATING_TYPE_SUCCESS_OR_ERROR,
    TypeEditorActionTypes
} from "../../store/typeEditor/types";

import {
    get,
    post,
    GetBadResponseData,
    ApiError
} from "../../../models/webclient";

// eslint-disable-next-line require-yield
export function* createType(action) {
    try {
        const url = process.env.REACT_APP_API_BASE_URL + "typeeditor";
        const response = yield call(post, url, action.payload.libraryType);

        // This is a bad request
        if (response.status === 400) {
            const data = GetBadResponseData(response);
            console.log(data, response);

            const apiError = {
                key: CREATING_TYPE_SUCCESS_OR_ERROR,
                errorMessage: data.title,
                errorData: data,
            } as ApiError;

            const payload = {
                apiError: apiError,
            };

            yield put({
                type: CREATING_TYPE_SUCCESS_OR_ERROR,
                payload: payload,
            });
            return;
        }



    } catch (error) {

    }
}

export function* getInitialData(action: TypeEditorActionTypes) {
    try {
        const aspectUrl = process.env.REACT_APP_API_BASE_URL + "typeeditor/aspects";
        const statusUrl =
            process.env.REACT_APP_API_BASE_URL + "typeeditor/statuses";
        const objectsUrl =
            process.env.REACT_APP_API_BASE_URL + "typeeditor/objects";

        const aspectResponse = yield call(get, aspectUrl);
        const statusResponse = yield call(get, statusUrl);
        const objectResponse = yield call(get, objectsUrl);

        const payload = {
            aspects: aspectResponse.data,
            objectTypes: objectResponse.data,
            statuses: statusResponse.data,
        };

        yield put({
            type: FETCHING_INITIAL_SUCCESS_OR_ERROR,
            payload: payload,
        });
    } catch (error) {
        const payload = {
            aspects: [],
            objectTypes: [],
            statuses: [],
        };

        yield put({
            type: FETCHING_INITIAL_SUCCESS_OR_ERROR,
            payload: payload,
        });
    }
}

export function* getRDS(action) {
    try {
        const rdsURL =
            process.env.REACT_APP_API_BASE_URL +
            "typeeditor/rds/" +
            action.payload.aspect;

        const rdsResponse = yield call(get, rdsURL);

        const payload = {
            Rds: rdsResponse.data,
        };

        yield put({
            type: FETCHING_RDS_SUCCESS_OR_ERROR,
            payload: payload,
        });
    } catch (error) {
        const payload = {
            Rds: [],
        };

        yield put({
            type: FETCHING_RDS_SUCCESS_OR_ERROR,
            payload: payload,
        });
    }
}

export function* getTerminals(action) {
    try {
        const terminalURL =
            process.env.REACT_APP_API_BASE_URL + "typeeditor/terminalsbycategory";

        const terminalResponse = yield call(get, terminalURL);

        const payload = {
            terminals: terminalResponse.data,
        };

        yield put({
            type: FETCHING_TERMINALS_SUCCESS_OR_ERROR,
            payload: payload,
        });
    } catch (error) {
        const payload = {
            terminals: [],
        };

        yield put({
            type: FETCHING_TERMINALS_SUCCESS_OR_ERROR,
            payload: payload,
        });
    }
}

export function* getAttributes(action) {
    try {
        const attributesURL =
            process.env.REACT_APP_API_BASE_URL +
            "typeeditor/attributes/" +
            action.payload.aspect;

        const attributesResponse = yield call(get, attributesURL);

        const payload = {
            AttributeType: attributesResponse.data,
        };

        yield put({
            type: FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
            payload: payload,
        });
    } catch (error) {
        const payload = {
            AttributeType: [],
        };

        yield put({
            type: FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
            payload: payload,
        });
    }
}
