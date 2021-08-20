import { call, put as statePut } from "redux-saga/effects";
import {
  FETCHING_TYPE_SUCCESS_OR_ERROR,
  FETCHING_INITIAL_SUCCESS_OR_ERROR,
  FETCHING_RDS_SUCCESS_OR_ERROR,
  FETCHING_TERMINALS_SUCCESS_OR_ERROR,
  FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
  CREATING_TYPE_SUCCESS_OR_ERROR,
  UPDATING_TYPE_SUCCESS_OR_ERROR,
  FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR,
  FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR,
  TypeEditorActionTypes,
  FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
} from "../../store/typeEditor/types";

import {
  get,
  post,
  GetBadResponseData,
  ApiError,
} from "../../../models/webclient";

export function* updateType(action) {
  try {
    const url =
      process.env.REACT_APP_API_BASE_URL +
      "typeeditor/" +
      action.payload?.selectedType;
    const response = yield call(post, url, action.payload.libraryType);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: UPDATING_TYPE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield statePut({
        type: UPDATING_TYPE_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }
    // Bad request end

    const payload = {
      apiError: null,
    };

    yield statePut({
      type: UPDATING_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: UPDATING_TYPE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield statePut({
      type: UPDATING_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* createType(action) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "typeeditor";
    const response = yield call(post, url, action.payload.libraryType);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: CREATING_TYPE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield statePut({
        type: CREATING_TYPE_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }
    // Bad request end

    const payload = {
      apiError: null,
    };

    yield statePut({
      type: CREATING_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: CREATING_TYPE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield statePut({
      type: CREATING_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getInitialData(action: TypeEditorActionTypes) {
  try {
    const aspectUrl = process.env.REACT_APP_API_BASE_URL + "typeeditor/aspects";
    const objectsUrl =
      process.env.REACT_APP_API_BASE_URL + "typeeditor/objects";

    const aspectResponse = yield call(get, aspectUrl);
    const objectResponse = yield call(get, objectsUrl);

    const payload = {
      aspects: aspectResponse.data,
      objectTypes: objectResponse.data,
    };

    yield statePut({
      type: FETCHING_INITIAL_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      aspects: [],
      objectTypes: [],
    };

    yield statePut({
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

    yield statePut({
      type: FETCHING_RDS_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      Rds: [],
    };

    yield statePut({
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

    yield statePut({
      type: FETCHING_TERMINALS_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      terminals: [],
    };

    yield statePut({
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

    yield statePut({
      type: FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      AttributeType: [],
    };

    yield statePut({
      type: FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getLocationTypes(action) {
  try {
    const locationTypesURL =
      process.env.REACT_APP_API_BASE_URL + "enum/location-types";

    const locationTypesResponse = yield call(get, locationTypesURL);

    const payload = {
      locationTypes: locationTypesResponse.data,
    };

    yield statePut({
      type: FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      locationTypes: [],
    };

    yield statePut({
      type: FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getPredefinedAttributes(action) {
  try {
    const predefinedAttributesURL =
      process.env.REACT_APP_API_BASE_URL + "typeeditor/predefined-attributes";

    const predefinedAttributesResponse = yield call(
      get,
      predefinedAttributesURL
    );

    const payload = {
      predefinedAttributes: predefinedAttributesResponse.data,
    };

    yield statePut({
      type: FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      predefinedAttributes: [],
    };

    yield statePut({
      type: FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getblobData() {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "common/blob/";
    const response = yield call(get, url);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        icons: [],
        apiError: apiError,
      };

      yield statePut({
        type: FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }
    // Bad request end

    const payload = {
      icons: response.data,
      apiError: null,
    };

    yield statePut({
      type: FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      icons: [],
      apiError: apiError,
    };

    yield statePut({
      type: FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getSelectedNode(action) {
  try {
    const selectedNodeURL =
      process.env.REACT_APP_API_BASE_URL +
      "typeeditor/librarytype/" +
      action.payload.selectedType +
      "/" +
      action.payload.filter;

    const selectedNodeResponse = yield call(get, selectedNodeURL);

    const payload = {
      selectedNode: selectedNodeResponse.data,
    };

    yield statePut({
      type: FETCHING_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      selectedNode: {},
    };

    yield statePut({
      type: FETCHING_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}
