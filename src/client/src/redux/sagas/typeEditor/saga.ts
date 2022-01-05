import { call, put as statePut } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_LIBRARY_ITEM, REMOVE_LIBRARY_ITEM } from "../../store/library/types";
import { get, post, GetBadResponseData, ApiError } from "../../../models/webclient";
import { Aspect, CreateLibraryType, SimpleType, SimpleTypeResponse } from "../../../models";
import { FetchingTypeAction } from "../../../typeEditor/redux/types";
import {
  fetchingAttributesSuccessOrError,
  fetchingBlobDataSuccessOrError,
  fetchingInitialDataSuccessOrError,
  fetchingLocationTypesSuccessOrError,
  fetchingPredefinedAttributesSuccessOrError,
  fetchingRdsSuccessOrError,
  fetchingSimpleTypesSuccessOrError,
  fetchingTerminalsSuccessOrError,
  fetchingTypeSuccessOrError,
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
      const data = GetBadResponseData(response);

      const apiError = {
        key: saveLibraryTypeSuccessOrError.type,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

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
    const apiError = {
      key: saveLibraryTypeSuccessOrError.type,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    yield statePut(saveLibraryTypeSuccessOrError(apiError));
  }
}

export function* getInitialData() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}enum/9`;
    const purposesResponse = yield call(get, endpointUrl);

    yield statePut(fetchingInitialDataSuccessOrError(purposesResponse.data));
  } catch (error) {
    yield statePut(fetchingInitialDataSuccessOrError([]));
  }
}

export function* getRDS(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}rds/${aspect}`;
    const rdsResponse = yield call(get, endpointUrl);

    yield statePut(fetchingRdsSuccessOrError(rdsResponse.data));
  } catch (error) {
    yield statePut(fetchingRdsSuccessOrError([]));
  }
}

export function* getTerminals() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}terminaltype/category`;
    const terminalResponse = yield call(get, endpointUrl);

    yield statePut(fetchingTerminalsSuccessOrError(terminalResponse.data));
  } catch (error) {
    yield statePut(fetchingTerminalsSuccessOrError([]));
  }
}

export function* getAttributes(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}attributetype/${aspect}`;
    const attributesResponse = yield call(get, endpointUrl);

    yield statePut(fetchingAttributesSuccessOrError(attributesResponse.data));
  } catch (error) {
    yield statePut(fetchingAttributesSuccessOrError([]));
  }
}

export function* getLocationTypes() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}enum/location-types`;
    const locationTypesResponse = yield call(get, endpointUrl);

    yield statePut(fetchingLocationTypesSuccessOrError(locationTypesResponse.data));
  } catch (error) {
    yield statePut(fetchingLocationTypesSuccessOrError([]));
  }
}

export function* getPredefinedAttributes() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}attributetype/predefined-attributes`;
    const predefinedAttributesResponse = yield call(get, endpointUrl);

    yield statePut(fetchingPredefinedAttributesSuccessOrError(predefinedAttributesResponse.data));
  } catch (error) {
    yield statePut(fetchingPredefinedAttributesSuccessOrError([]));
  }
}

export function* getBlobData() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}blob/`;
    const response = yield call(get, endpointUrl);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: fetchingBlobDataSuccessOrError.type,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      yield statePut(fetchingBlobDataSuccessOrError({ icons: [], apiError }));
      return;
    }

    yield statePut(fetchingBlobDataSuccessOrError({ icons: response.data, apiError: null }));
  } catch (error) {
    const apiError = {
      key: fetchingBlobDataSuccessOrError.type,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    yield yield statePut(fetchingBlobDataSuccessOrError({ icons: [], apiError }));
  }
}

export function* getSelectedType(action: PayloadAction<FetchingTypeAction>) {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}librarytype/${action.payload.selectedType}/${action.payload.filter}`;
    const selectedNodeResponse = yield call(get, endpointUrl);
    const createLibraryType = selectedNodeResponse.data as CreateLibraryType;
    createLibraryType.id = action.payload.selectedType;

    yield statePut(fetchingTypeSuccessOrError(selectedNodeResponse.data));
  } catch (error) {
    yield statePut(fetchingTypeSuccessOrError(null));
  }
}

export function* getSimpleTypes() {
  try {
    const endpointUrl = `${process.env.REACT_APP_API_BASE_URL}librarytype/simpletype`;
    const simpleTypesURLResponse = yield call(get, endpointUrl);

    const simpleTypes = (simpleTypesURLResponse.data as Array<SimpleTypeResponse>).map((comp) => {
      return { ...comp, attributes: comp.attributeTypes } as SimpleType;
    });

    yield statePut(fetchingSimpleTypesSuccessOrError({simpleTypes, apiError: null}));
  } catch (error) {
    const apiError = {
      key: fetchingSimpleTypesSuccessOrError.type,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    yield statePut(fetchingSimpleTypesSuccessOrError({simpleTypes: [], apiError}));
  }
}
