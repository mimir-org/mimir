import { call, put as statePut } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { addLibraryItem, removeLibraryItem } from "../../store/library/librarySlice";
import { ApiError, GetBadResponseData, get, post, HttpResponse } from "../../../models/webclient";
import { Aspect, CreateLibraryType, SimpleType } from "../../../models";
import { SimpleTypeResponse } from "./types";
import { FetchingTypeAction } from "../../../typeEditor/redux/types";
import {
  fetchAttributesSuccessOrError,
  fetchBlobDataSuccessOrError,
  fetchCreateLibraryTypeSuccessOrError,
  fetchInitialDataSuccessOrError,
  fetchLocationTypesSuccessOrError,
  fetchPredefinedAttributesSuccessOrError,
  fetchRdsSuccessOrError,
  fetchSimpleTypesSuccessOrError,
  fetchTerminalsSuccessOrError,
  saveLibraryTypeSuccessOrError,
} from "../../../typeEditor/redux/typeEditorSlice";
import Config from "../../../models/Config";

export function* saveType(action: PayloadAction<CreateLibraryType>) {
  try {
    const createLibraryType = action.payload;

    const url = createLibraryType.id
      ? `${Config.API_BASE_URL}librarytype/${createLibraryType.id}`
      : `${Config.API_BASE_URL}librarytype`;

    const response = yield call(post, url, createLibraryType);

    if (response.status === 400) {
      const apiError = getApiErrorForBadRequest(saveLibraryTypeSuccessOrError.type, response);
      yield statePut(saveLibraryTypeSuccessOrError(apiError));
      return;
    }

    yield statePut(saveLibraryTypeSuccessOrError(null));

    // LIBRARY: Remove item
    yield statePut(removeLibraryItem(createLibraryType.id));

    // LIBRARY: Add the created library item back in
    yield statePut(addLibraryItem(response.data));
  } catch (error) {
    const apiError = getApiErrorForException(saveLibraryTypeSuccessOrError.type, error);
    yield statePut(saveLibraryTypeSuccessOrError(apiError));
  }
}

export function* getInitialData() {
  try {
    const endpointUrl = `${Config.API_BASE_URL}enum/9`;
    const purposesResponse = yield call(get, endpointUrl);

    yield statePut(fetchInitialDataSuccessOrError(purposesResponse.data));
  } catch (error) {
    yield statePut(fetchInitialDataSuccessOrError([]));
  }
}

export function* getRDS() {
  try {
    const endpointUrl = `${Config.API_BASE_URL}rds`;
    const rdsResponse = yield call(get, endpointUrl);

    yield statePut(fetchRdsSuccessOrError(rdsResponse.data));
  } catch (error) {
    yield statePut(fetchRdsSuccessOrError([]));
  }
}

export function* getTerminals() {
  try {
    const endpointUrl = `${Config.API_BASE_URL}terminaltype/category`;
    const terminalResponse = yield call(get, endpointUrl);

    yield statePut(fetchTerminalsSuccessOrError(terminalResponse.data));
  } catch (error) {
    yield statePut(fetchTerminalsSuccessOrError([]));
  }
}

export function* getAttributes(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const endpointUrl = `${Config.API_BASE_URL}attributetype/${aspect}`;
    const attributesResponse = yield call(get, endpointUrl);

    yield statePut(fetchAttributesSuccessOrError(attributesResponse.data));
  } catch (error) {
    yield statePut(fetchAttributesSuccessOrError([]));
  }
}

export function* getLocationTypes() {
  try {
    const endpointUrl = `${Config.API_BASE_URL}enum/location-types`;
    const locationTypesResponse = yield call(get, endpointUrl);

    yield statePut(fetchLocationTypesSuccessOrError(locationTypesResponse.data));
  } catch (error) {
    yield statePut(fetchLocationTypesSuccessOrError([]));
  }
}

export function* getPredefinedAttributes() {
  try {
    const endpointUrl = `${Config.API_BASE_URL}attributetype/predefined-attributes`;
    const predefinedAttributesResponse = yield call(get, endpointUrl);

    yield statePut(fetchPredefinedAttributesSuccessOrError(predefinedAttributesResponse.data));
  } catch (error) {
    yield statePut(fetchPredefinedAttributesSuccessOrError([]));
  }
}

export function* getBlobData() {
  try {
    const endpointUrl = `${Config.API_BASE_URL}blob/`;
    const response = yield call(get, endpointUrl);

    // This is a bad request
    if (response.status === 400) {
      const apiError = getApiErrorForBadRequest(fetchBlobDataSuccessOrError.type, response);
      yield statePut(fetchBlobDataSuccessOrError({ icons: [], apiError }));
      return;
    }

    yield statePut(fetchBlobDataSuccessOrError({ icons: response.data, apiError: null }));
  } catch (error) {
    const apiError = getApiErrorForException(fetchBlobDataSuccessOrError.type, error);
    yield statePut(fetchBlobDataSuccessOrError({ icons: [], apiError }));
  }
}

export function* getSelectedCreateLibraryType(action: PayloadAction<FetchingTypeAction>) {
  try {
    const endpointUrl = `${Config.API_BASE_URL}librarytype/${action.payload.selectedType}/${action.payload.filter}`;
    const selectedNodeResponse = yield call(get, endpointUrl);
    const createLibraryType = selectedNodeResponse.data as CreateLibraryType;
    createLibraryType.id = action.payload.selectedType;

    yield statePut(fetchCreateLibraryTypeSuccessOrError(selectedNodeResponse.data));
  } catch (error) {
    yield statePut(fetchCreateLibraryTypeSuccessOrError(null));
  }
}

export function* getSimpleTypes() {
  try {
    const endpointUrl = `${Config.API_BASE_URL}librarytype/simpletype`;
    const simpleTypesURLResponse = yield call(get, endpointUrl);

    const simpleTypes = (simpleTypesURLResponse.data as Array<SimpleTypeResponse>).map((comp) => {
      return { ...comp, attributes: comp.attributeTypes } as SimpleType;
    });

    yield statePut(fetchSimpleTypesSuccessOrError({ simpleTypes, apiError: null }));
  } catch (error) {
    const apiError = {
      key: fetchSimpleTypesSuccessOrError.type,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    yield statePut(fetchSimpleTypesSuccessOrError({ simpleTypes: [], apiError }));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getApiErrorForBadRequest(key: string, response: HttpResponse<any>): ApiError {
  const data = GetBadResponseData(response);
  return {
    key,
    errorMessage: data?.title,
    errorData: data,
  };
}

function getApiErrorForException(key: string, error: Error): ApiError {
  return {
    key,
    errorMessage: error?.message,
    errorData: null,
  };
}
