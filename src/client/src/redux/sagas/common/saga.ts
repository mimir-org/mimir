import { call, put } from "redux-saga/effects";
import Config from "../../../models/Config";
import { GetApiErrorForBadRequest, GetApiErrorForException, get } from "../../../models/webclient";
import {
  fetchCollaborationPartnersSuccessOrError,
  fetchCombinedAttributeFiltersSuccessOrError,
  fetchParsersSuccessOrError
} from "../../store/common/commonSlice";

/**
 * Get all registered collaboration partners
 */
export function* getCollaborationPartners() {
  try {
    const url = `${Config.API_BASE_URL}common/collaboration-partner`;
    const response = yield call(get, url);

    if (response.status === 400) {
      const apiError = GetApiErrorForBadRequest(response, fetchCollaborationPartnersSuccessOrError.type);
      yield put(fetchCollaborationPartnersSuccessOrError({ collaborationPartners: [], apiError }));
      return;
    }

    yield put(fetchCollaborationPartnersSuccessOrError({ collaborationPartners: response.data, apiError: null }));
  } catch (error) {
    const apiError = GetApiErrorForException(error, fetchCollaborationPartnersSuccessOrError.type);
    yield put(fetchCollaborationPartnersSuccessOrError({ collaborationPartners: [], apiError }));
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
