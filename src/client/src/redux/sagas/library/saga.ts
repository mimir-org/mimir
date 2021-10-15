import { call, put } from "redux-saga/effects";
import { saveAs } from "file-saver";
import { get, post, ApiError, GetBadResponseData } from "../../../models/webclient";
import {
  FETCHING_LIBRARY_SUCCESS_OR_ERROR,
  EXPORT_LIBRARY_SUCCESS_OR_ERROR,
  IMPORT_LIBRARY_SUCCESS_OR_ERROR,
  FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR,
  FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR,
  FetchingLibraryTransportActionTypes,
  FetchingLibraryInterfaceActionTypes,
  LibraryActionTypes,
  ExportLibraryAction,
  ImportLibraryAction,
} from "../../store/library/types";

export function* searchLibrary(action: LibraryActionTypes) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "library?name=" + action.payload;
    const response = yield call(get, url);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        nodeTypes: [],
        transportTypes: [],
        interfaceTypes: [],
        apiError: apiError,
      };

      yield put({
        type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      nodeTypes: response.data.objectBlocks,
      transportTypes: response.data.transports,
      interfaceTypes: response.data.interfaces,
      apiError: null,
    };

    yield put({
      type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      nodeTypes: [],
      transportTypes: [],
      interfaceTypes: [],
      apiError: apiError,
    };

    yield put({
      type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* exportLibrary(action: ExportLibraryAction) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "librarytypefile/export";
    const response = yield call(get, url);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: EXPORT_LIBRARY_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: EXPORT_LIBRARY_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }
    // End bad request

    const blob = new Blob([JSON.stringify(response.data, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, action.payload.fileName + ".json");

    const payload = {
      apiError: null,
    };

    yield put({
      type: EXPORT_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: EXPORT_LIBRARY_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: EXPORT_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* importLibrary(action: ImportLibraryAction) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "librarytypefile/import";
    const response = yield call(post, url, action.payload.libraryTypes);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: IMPORT_LIBRARY_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: IMPORT_LIBRARY_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }
    // End bad request

    const payload = {
      apiError: null,
    };

    yield put({
      type: IMPORT_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: IMPORT_LIBRARY_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: IMPORT_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* getTransportTypes(action: FetchingLibraryTransportActionTypes) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "library/transport";
    const response = yield call(get, url);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      yield put({
        type: FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR,
        payload: {
          transports: [],
          apiError: apiError,
        },
      });
      return;
    }

    yield put({
      type: FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR,
      payload: {
        transports: response.data,
        apiError: null,
      },
    });
  } catch (error) {
    const apiError = {
      key: FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    yield put({
      type: FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR,
      payload: {
        transports: [],
        apiError: apiError,
      },
    });
  }
}

export function* getInterfaceTypes(action: FetchingLibraryInterfaceActionTypes) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "library/interface";
    const response = yield call(get, url);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      yield put({
        type: FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR,
        payload: {
          transports: [],
          apiError: apiError,
        },
      });
      return;
    }

    yield put({
      type: FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR,
      payload: {
        transports: response.data,
        apiError: null,
      },
    });
  } catch (error) {
    const apiError = {
      key: FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    yield put({
      type: FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR,
      payload: {
        transports: [],
        apiError: apiError,
      },
    });
  }
}
