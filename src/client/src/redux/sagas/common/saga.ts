import { call, put } from "redux-saga/effects";
import Config from "../../../models/Config";
import { GetApiErrorForBadRequest, GetApiErrorForException, get } from "../../../models/webclient";
import {
  fetchCompanySuccessOrError,
  fetchCompaniesSuccessOrError,
  fetchCombinedAttributeFiltersSuccessOrError,
  fetchParsersSuccessOrError,
} from "../../store/common/commonSlice";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

/**
 * Get current company
 */
export function* getCompany() {
  try {
    const url = `${Config.API_BASE_URL}common/company/current`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchCompanySuccessOrError.type);
      yield put(fetchCompanySuccessOrError({ company: {} as MimirorgCompanyCm, apiError }));
      return;
    }

    yield put(fetchCompanySuccessOrError({ company: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchCompanySuccessOrError.type);
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
      const apiError = GetApiErrorForBadRequest(response, fetchCompaniesSuccessOrError.type);
      yield put(fetchCompaniesSuccessOrError({ companies: [], apiError }));
      return;
    }

    yield put(fetchCompaniesSuccessOrError({ companies: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchCompaniesSuccessOrError.type);
    yield put(fetchCompaniesSuccessOrError({ companies: [], apiError }));
  }
}

/**
 * Get all attribute filters
 */
export function* getAttributeFilters() {
  try {
    const url = `${Config.API_BASE_URL}common/attribute-filter`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchCombinedAttributeFiltersSuccessOrError.type);
      yield put(fetchCombinedAttributeFiltersSuccessOrError({ filters: [], apiError }));
      return;
    }

    yield put(fetchCombinedAttributeFiltersSuccessOrError({ filters: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchCombinedAttributeFiltersSuccessOrError.type);
    yield put(fetchCombinedAttributeFiltersSuccessOrError({ filters: [], apiError }));
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
      const apiError = GetApiErrorForBadRequest(response, fetchParsersSuccessOrError.type);
      yield put(fetchParsersSuccessOrError({ parsers: [], apiError }));
      return;
    }

    yield put(fetchParsersSuccessOrError({ parsers: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchParsersSuccessOrError.type);
    yield put(fetchParsersSuccessOrError({ parsers: [], apiError }));
  }
}
