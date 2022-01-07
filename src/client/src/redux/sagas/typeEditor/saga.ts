import { call, put as statePut } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_LIBRARY_ITEM, REMOVE_LIBRARY_ITEM } from "../../store/library/types";
import { get, post, GetBadResponseData, ApiError } from "../../../models/webclient";
import { Aspect, CreateLibraryType, SimpleType, SimpleTypeResponse } from "../../../models";
import { FetchingTypeAction } from "../../../typeEditor/redux/types";
import {
  fetchAttributesSuccessOrError,
  fetchBlobDataSuccessOrError,
  fetchInitialDataSuccessOrError,
  fetchLocationTypesSuccessOrError,
  fetchPredefinedAttributesSuccessOrError,
  fetchRdsSuccessOrError,
  fetchSimpleTypesSuccessOrError,
  fetchTerminalsSuccessOrError,
  fetchCreateLibraryTypeSuccessOrError,
  saveLibraryTypeSuccessOrError
} from "../../../typeEditor/redux/typeEditorSlice";

export function* saveType(action: PayloadAction<CreateLibraryType>) {
  try {
    const createLibraryType = action.payload;

    const url = createLibraryType.id ?
      `${process.env.REACT_APP_API_BASE_URL}librarytype/${createLibraryType.id}` :
      `${process.env.REACT_APP_API_BASE_URL}librarytype`

    const response = yield call(post, url, createLibraryType);

    if (response.status === 400) {
      const apiError = getApiErrorForBadRequest(saveLibraryTypeSuccessOrError.type, response);
      yield statePut(saveLibraryTypeSuccessOrError(apiError));
      return;
    }

    yield statePut(saveLibraryTypeSuccessOrError(null));

    // Remove item from library
    if (createLibraryType.id) {
      yield statePut({
        type: REMOVE_LIBRARY_ITEM,
        payload: {
          id: createLibraryType.id,
        },
      });
    }

    // Add the new item to library
    yield statePut({
      type: ADD_LIBRARY_ITEM,
      payload: response.data,
    });
  } catch (error) {
    const apiError = getApiErrorForException(saveLibraryTypeSuccessOrError.type, error);
    yield statePut(saveLibraryTypeSuccessOrError(apiError));
  }
}

export function* getInitialData() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}enum/9`;
    const purposesResponse = yield call(get, endpointUrl);

    yield statePut(fetchInitialDataSuccessOrError(purposesResponse.data));
  } catch (error) {
    yield statePut(fetchInitialDataSuccessOrError([]));
  }
}

export function* getRDS(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}rds/${aspect}`;
    const rdsResponse = yield call(get, endpointUrl);

    yield statePut(fetchRdsSuccessOrError(rdsResponse.data));
  } catch (error) {
    yield statePut(fetchRdsSuccessOrError([]));
  }
}

export function* getTerminals() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}terminaltype/category`;
    const terminalResponse = yield call(get, endpointUrl);

    yield statePut(fetchTerminalsSuccessOrError(terminalResponse.data));
  } catch (error) {
    yield statePut(fetchTerminalsSuccessOrError([]));
  }
}

export function* getAttributes(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}attributetype/${aspect}`;
    const attributesResponse = yield call(get, endpointUrl);

    yield statePut(fetchAttributesSuccessOrError(attributesResponse.data));
  } catch (error) {
    yield statePut(fetchAttributesSuccessOrError([]));
  }
}

export function* getLocationTypes() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}enum/location-types`;
    const locationTypesResponse = yield call(get, endpointUrl);

    yield statePut(fetchLocationTypesSuccessOrError(locationTypesResponse.data));
  } catch (error) {
    yield statePut(fetchLocationTypesSuccessOrError([]));
  }
}

export function* getPredefinedAttributes() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}attributetype/predefined-attributes`;
    const predefinedAttributesResponse = yield call(get, endpointUrl);

    yield statePut(fetchPredefinedAttributesSuccessOrError(predefinedAttributesResponse.data));
  } catch (error) {
    yield statePut(fetchPredefinedAttributesSuccessOrError([]));
  }
}

export function* getBlobData() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}blob/`;
    const response = yield call(get, endpointUrl);

    // This is a bad request
    if (response.status === 400) {
      const apiError = getApiErrorForBadRequest(fetchBlobDataSuccessOrError.type, response);
      yield statePut(fetchBlobDataSuccessOrError({ icons: [], apiError}));
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
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}librarytype/${action.payload.selectedType}/${action.payload.filter}`;
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
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}librarytype/simpletype`;
    const simpleTypesURLResponse = yield call(get, endpointUrl);

    const simpleTypes = (simpleTypesURLResponse.data as Array<SimpleTypeResponse>).map((comp) => {
      return { ...comp, attributes: comp.attributeTypes } as SimpleType;
    });

    yield statePut(fetchSimpleTypesSuccessOrError({simpleTypes, apiError: null}));
  } catch (error) {
    const apiError = {
      key: fetchSimpleTypesSuccessOrError.type,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    yield statePut(fetchSimpleTypesSuccessOrError({simpleTypes: [], apiError}));
  }
}

function getApiErrorForBadRequest(key: string, response: any): ApiError {
  const data = GetBadResponseData(response);
  return {
    key,
    errorMessage: data?.title,
    errorData: data
  };
}

function getApiErrorForException(key: string, error: any): ApiError {
  return {
    key,
    errorMessage: error?.message,
    errorData: null,
  };
}