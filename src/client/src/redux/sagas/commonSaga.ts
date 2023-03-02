import { all, takeEvery, call, put } from "redux-saga/effects";
import Config from "../../lib/config/config";
import {
  fetchCompanySuccessOrError,
  fetchCompaniesSuccessOrError,
  fetchParsersSuccessOrError,
  fetchCompanies,
  fetchParsers,
  fetchCompany,
} from "../store/commonSlice";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";
import getApiErrorForBadRequest from "../../lib/helpers/API/getApiErrorForBadRequest";
import getApiErrorForException from "../../lib/helpers/API/getApiErrorForException";
import { get } from "../../lib/helpers/webClient/webClient";

/**
 * Get current company
 */
export function* getCompany() {
  try {
    const url = `${Config.API_BASE_URL}common/company/current`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = getApiErrorForBadRequest(response, fetchCompanySuccessOrError.type);
      yield put(fetchCompanySuccessOrError({ company: {} as MimirorgCompanyCm, apiError }));
      return;
    }

    yield put(fetchCompanySuccessOrError({ company: response.data, apiError: null }));
  } catch (error) {
    const apiError = getApiErrorForException(error, fetchCompanySuccessOrError.type);
    yield put(fetchCompanySuccessOrError({ company: {} as MimirorgCompanyCm, apiError }));
  }
}

/**
 * Get all registered collaboration partners
 */
export function* getCompanies() {
  try {
    const url = `${Config.API_BASE_URL}common/company`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = getApiErrorForBadRequest(response, fetchCompaniesSuccessOrError.type);
      yield put(fetchCompaniesSuccessOrError({ companies: [], apiError }));
      return;
    }

    yield put(fetchCompaniesSuccessOrError({ companies: response.data, apiError: null }));
  } catch (error) {
    const apiError = getApiErrorForException(error, fetchCompaniesSuccessOrError.type);
    yield put(fetchCompaniesSuccessOrError({ companies: [], apiError }));
  }
}

/**
 * Get all registered data parsers
 */
export function* getParsers() {
  try {
    const url = `${Config.API_BASE_URL}common/parser`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = getApiErrorForBadRequest(response, fetchParsersSuccessOrError.type);
      yield put(fetchParsersSuccessOrError({ parsers: [], apiError }));
      return;
    }

    yield put(fetchParsersSuccessOrError({ parsers: response.data, apiError: null }));
  } catch (error) {
    const apiError = getApiErrorForException(error, fetchParsersSuccessOrError.type);
    yield put(fetchParsersSuccessOrError({ parsers: [], apiError }));
  }
}

export default function* commonSaga() {
  yield all([takeEvery(fetchCompany, getCompany), takeEvery(fetchCompanies, getCompanies), takeEvery(fetchParsers, getParsers)]);
}
