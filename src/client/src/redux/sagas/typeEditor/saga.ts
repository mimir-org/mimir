import { call, put as statePut } from "redux-saga/effects";
import { ADD_LIBRARY_ITEM, REMOVE_LIBRARY_ITEM } from "../../store/library/types";
import { get, post, GetBadResponseData, ApiError } from "../../../models/webclient";
import { Aspect, SimpleType, SimpleTypeResponse, CreateLibraryType } from "../../../models";
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

export function* saveType(action) {
  try {
    const createLibraryType = action.payload.libraryType as CreateLibraryType;
    let url = "";

    if (createLibraryType.id) url = process.env.REACT_APP_API_BASE_URL + "librarytype/" + createLibraryType.id;
    else url = process.env.REACT_APP_API_BASE_URL + "librarytype";

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
    const purposesUrl = process.env.REACT_APP_API_BASE_URL + "enum/9";
    const purposesResponse = yield call(get, purposesUrl);

    yield statePut(fetchingInitialDataSuccessOrError(purposesResponse.data));
  } catch (error) {
    yield statePut(fetchingInitialDataSuccessOrError([]));
  }
}

export function* getRDS(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const rdsURL = process.env.REACT_APP_API_BASE_URL + "rds/" + aspect;
    const rdsResponse = yield call(get, rdsURL);

    yield statePut(fetchingRdsSuccessOrError(rdsResponse.data));
  } catch (error) {
    yield statePut(fetchingRdsSuccessOrError([]));
  }
}

export function* getTerminals() {
  try {
    const terminalURL = process.env.REACT_APP_API_BASE_URL + "terminaltype/category";
    const terminalResponse = yield call(get, terminalURL);

    yield statePut(fetchingTerminalsSuccessOrError(terminalResponse.data));
  } catch (error) {
    yield statePut(fetchingTerminalsSuccessOrError([]));
  }
}

export function* getAttributes(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const attributesURL = process.env.REACT_APP_API_BASE_URL + "attributetype/" + aspect;
    const attributesResponse = yield call(get, attributesURL);

    yield statePut(fetchingAttributesSuccessOrError(attributesResponse.data));
  } catch (error) {
    yield statePut(fetchingAttributesSuccessOrError([]));
  }
}

export function* getLocationTypes() {
  try {
    const locationTypesURL = process.env.REACT_APP_API_BASE_URL + "enum/location-types";
    const locationTypesResponse = yield call(get, locationTypesURL);

    yield statePut(fetchingLocationTypesSuccessOrError(locationTypesResponse.data));
  } catch (error) {
    yield statePut(fetchingLocationTypesSuccessOrError([]));
  }
}

export function* getPredefinedAttributes() {
  try {
    const predefinedAttributesURL = process.env.REACT_APP_API_BASE_URL + "attributetype/predefined-attributes";
    const predefinedAttributesResponse = yield call(get, predefinedAttributesURL);

    yield statePut(fetchingPredefinedAttributesSuccessOrError(predefinedAttributesResponse.data));
  } catch (error) {
    yield statePut(fetchingPredefinedAttributesSuccessOrError([]));
  }
}

export function* getBlobData() {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "blob/";
    const response = yield call(get, url);

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

export function* getSelectedType(action) {
  try {
    const selectedNodeURL = process.env.REACT_APP_API_BASE_URL + "librarytype/" + action.payload.selectedType + "/" + action.payload.filter;
    const selectedNodeResponse = yield call(get, selectedNodeURL);
    const createLibraryType = selectedNodeResponse.data as CreateLibraryType;
    createLibraryType.id = action.payload.selectedType;

    yield statePut(fetchingTypeSuccessOrError(selectedNodeResponse.data));
  } catch (error) {
    yield statePut(fetchingTypeSuccessOrError(null));
  }
}

export function* getSimpleTypes() {
  try {
    const simpleTypeslURL = process.env.REACT_APP_API_BASE_URL + "librarytype/simpletype";
    const simpleTypesURLResponse = yield call(get, simpleTypeslURL);

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
