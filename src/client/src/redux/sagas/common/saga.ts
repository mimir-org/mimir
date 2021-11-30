import { call, put } from "redux-saga/effects";
import { CombinedAttributeFilter, EnumBase, CollaborationPartner, ModuleDescription } from "../../../models";
import { get, GetBadRequestPayload, GetErrorResponsePayload } from "../../../models/webclient";
import * as types from "../../store/common/types";

/**
 * Get all registered collaboration partners
 */
export function* getCollaborationPartners() {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "common/collaboration-partner";
    const response = yield call(get, url);

    if (response.status === 400) {
      yield put(GetBadRequestPayload(response, types.FETCHING_COLLABORATION_PARTNERS_SUCCESS_OR_ERROR));
      return;
    }

    yield put({
      type: types.FETCHING_COLLABORATION_PARTNERS_SUCCESS_OR_ERROR,
      payload: {
        collaborationPartners: response.data as CollaborationPartner[],
        apiError: null
      }
    });
  } catch (error) {
    yield put(GetErrorResponsePayload(error, types.FETCHING_COLLABORATION_PARTNERS_SUCCESS_OR_ERROR, { collaborationPartners: [] as CollaborationPartner[] }))
  }
}

/**
 * Get all registered statuses
 */
export function* getStatuses() {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "enum/7";
    const response = yield call(get, url);

    if (response.status === 400) {
      yield put(GetBadRequestPayload(response, types.FETCHING_STATUSES_SUCCESS_OR_ERROR));
      return;
    }

    yield put({
      type: types.FETCHING_STATUSES_SUCCESS_OR_ERROR,
      payload: {
        statuses: response.data as EnumBase[],
        apiError: null,
      }
    });
  } catch (error) {
    yield put(GetErrorResponsePayload(error, types.FETCHING_STATUSES_SUCCESS_OR_ERROR, { statuses: [] as EnumBase[] }))
  }
}

/**
 * Get all attribute filters
 */
export function* getAttributeFilters() {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "common/attribute-filter";
    const response = yield call(get, url);

    if (response.status === 400) {
      yield put(GetBadRequestPayload(response, types.FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR));
      return;
    }

    yield put({
      type: types.FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR,
      payload: {
        filters: response.data as CombinedAttributeFilter[],
        apiError: null,
      }
    });
  } catch (error) {
    yield put(GetErrorResponsePayload(error, types.FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR, { filters: [] as CombinedAttributeFilter[] }))
  }
}

/**
 * Get all registered data parsers
 */
export function* getParsers() {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "common/parser";
    const response = yield call(get, url);

    if (response.status === 400) {
      yield put(GetBadRequestPayload(response, types.FETCHING_PARSERS_SUCCESS_OR_ERROR));
      return;
    }

    yield put({
      type: types.FETCHING_PARSERS_SUCCESS_OR_ERROR,
      payload: {
        parsers: response.data as ModuleDescription[],
        apiError: null
      }
    });
  } catch (error) {
    yield put(GetErrorResponsePayload(error, types.FETCHING_PARSERS_SUCCESS_OR_ERROR, { parsers: [] as ModuleDescription[] }))
  }
}
