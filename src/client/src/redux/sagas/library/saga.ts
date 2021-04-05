import { call, put } from "redux-saga/effects";
import {
  FETCHING_LIBRARY_SUCCESS_OR_ERROR,
  LibraryActionTypes,
  LibraryState,
} from "../../store/library/types";
import LibraryDataset from "../../../data/LibraryDataset";

export function* searchLibrary(action: LibraryActionTypes) {
  try {
    const data = yield call(LibraryDataset.getAll);
    
    const payload = {
      nodes: data,
      hasError: false,
      errorMsg: null,
      fetching: false,
    };

    yield put({
      type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload as LibraryState,
    });
  } catch (error) {
    console.log("Error getting library data: " + error);

    const payload = {
      nodes: [],
      hasError: true,
      errorMsg: error,
      fetching: false,
    };

    yield put({
      type: FETCHING_LIBRARY_SUCCESS_OR_ERROR,
      payload: payload as LibraryState,
    });
  }
}
