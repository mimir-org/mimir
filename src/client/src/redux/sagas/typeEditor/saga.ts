import { call, put } from "redux-saga/effects";
import {
  FETCHING_INITIAL_SUCCESS_OR_ERROR,
  FETCHING_RDS_SUCCESS_OR_ERROR,
  FETCHING_TERMINALS_SUCCESS_OR_ERROR,
  TypeEditorActionTypes,
} from "../../store/typeEditor/types";

import { get } from "../../../models/webclient";

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
      statuses: statusResponse.data,
      objectTypes: objectResponse.data,
    };

    yield put({
      type: FETCHING_INITIAL_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      aspects: [],
      statuses: [],
      objectTypes: [],
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
      process.env.REACT_APP_API_BASE_URL + "typeeditor/terminals";

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
