import { call, put as statePut } from "redux-saga/effects";
import { ADD_LIBRARY_ITEM, REMOVE_LIBRARY_ITEM } from "../../store/library/types";
import { get, post, GetBadResponseData, ApiError } from "../../../models/webclient";
import { Aspect, CreateLibraryType } from "../../../models";
import {
  FETCHING_TYPE_SUCCESS_OR_ERROR,
  FETCHING_INITIAL_SUCCESS_OR_ERROR,
  FETCHING_RDS_SUCCESS_OR_ERROR,
  FETCHING_TERMINALS_SUCCESS_OR_ERROR,
  FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
  SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
  FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR,
  FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR,
  FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
  FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR,
  TypeEditorActionTypes,
} from "../../../typeEditor/redux/types";

export function* saveType(action) {
  try {
    const createLibraryType = action.payload.libraryType as CreateLibraryType;
    let url = "";

    if (createLibraryType.libraryId) {
      url = process.env.REACT_APP_API_BASE_URL + "librarytype/" + createLibraryType.libraryId;
    } else {
      url = process.env.REACT_APP_API_BASE_URL + "librarytype";
    }

    const response = yield call(post, url, createLibraryType);

    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield statePut({
        type: SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      apiError: null,
    };

    yield statePut({
      type: SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });

    // Remove item from library
    if (createLibraryType.libraryId) {
      yield statePut({
        type: REMOVE_LIBRARY_ITEM,
        payload: {
          id: createLibraryType.libraryId,
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
      key: SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield statePut({
      type: SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getInitialData(action: TypeEditorActionTypes) {
  try {
    const aspectUrl = process.env.REACT_APP_API_BASE_URL + "typeeditor/aspects";
    const objectsUrl = process.env.REACT_APP_API_BASE_URL + "typeeditor/objects";
    const purposesUrl = process.env.REACT_APP_API_BASE_URL + "enum/9";

    const aspectResponse = yield call(get, aspectUrl);
    const objectResponse = yield call(get, objectsUrl);
    const purposesResponse = yield call(get, purposesUrl);

    const payload = {
      aspects: aspectResponse.data,
      objectTypes: objectResponse.data,
      purposes: purposesResponse.data,
    };

    yield statePut({
      type: FETCHING_INITIAL_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      aspects: [],
      objectTypes: [],
      purposes: [],
    };

    yield statePut({
      type: FETCHING_INITIAL_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getRDS(action) {
  try {
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const rdsURL = process.env.REACT_APP_API_BASE_URL + "typeeditor/rds/" + aspect;

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
    const terminalURL = process.env.REACT_APP_API_BASE_URL + "terminaltype/category";

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
    const aspect = action.payload != null ? action.payload.aspect : Aspect.NotSet;
    const attributesURL = process.env.REACT_APP_API_BASE_URL + "typeeditor/attributes/" + aspect;

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
    const locationTypesURL = process.env.REACT_APP_API_BASE_URL + "enum/location-types";

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
    const predefinedAttributesURL = process.env.REACT_APP_API_BASE_URL + "typeeditor/predefined-attributes";

    const predefinedAttributesResponse = yield call(get, predefinedAttributesURL);

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
      "librarytype/" +
      action.payload.selectedType +
      "/" +
      action.payload.filter;

    const selectedNodeResponse = yield call(get, selectedNodeURL);
    const createLibraryType = selectedNodeResponse.data as CreateLibraryType;
    createLibraryType.libraryId = action.payload.selectedType;

    const payload = {
      selectedNode: selectedNodeResponse.data,
    };
    // console.log("payload get selected", createLibraryType);
    // payload.selectedNode.terminalTypes?.forEach((t, index) => (t.row = index));

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

export function* getSimpleTypes(action) {
  try {
    const simpleTypeslURL = process.env.REACT_APP_API_BASE_URL + "typeeditor/compositetype";

    const simpleTypesURLResponse = yield call(get, simpleTypeslURL);

    const payload = {
      simpleTypes: simpleTypesURLResponse.data,
    };

    yield statePut({
      type: FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const payload = {
      simpleTypes: [],
    };

    yield statePut({
      type: FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}
