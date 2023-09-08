import { LibrarySubProject } from "lib";
import { libraryApi } from "store/api";
import {
  fetchAspectObjectsFinished,
  fetchTerminalsFinished,
  fetchAttributesFinished,
  fetchQuantityDatumsFinished,
  fetchSubProjectsFinished,
} from "store/reducers/libraryReducer";
import { call, put } from "redux-saga/effects";
import { AspectObjectLibCm, TerminalLibCm, AttributeLibCm, QuantityDatumLibCm } from "@mimirorg/typelibrary-types";

export function* getAspectObjects() {
  try {
    const response: AspectObjectLibCm[] = yield call(libraryApi.getAspectObjects);
    yield put(fetchAspectObjectsFinished({ data: response }));
  } catch (error) {
    yield put(fetchAspectObjectsFinished({ data: null }));
  }
}

export function* getTerminals() {
  try {
    const response: TerminalLibCm[] = yield call(libraryApi.getTerminals);
    yield put(fetchTerminalsFinished({ data: response }));
  } catch (error) {
    yield put(fetchTerminalsFinished({ data: [] }));
  }
}

export function* getAttributes() {
  try {
    const response: AttributeLibCm[] = yield call(libraryApi.getAttributes);
    yield put(fetchAttributesFinished({ data: response }));
  } catch (error) {
    yield put(fetchAttributesFinished({ data: [] }));
  }
}

export function* getQuantityDatums() {
  try {
    const response: QuantityDatumLibCm[] = yield call(libraryApi.getQuantityDatums);
    yield put(fetchQuantityDatumsFinished({ data: response }));
  } catch (error) {
    yield put(fetchQuantityDatumsFinished({ data: [] }));
  }
}

export function* getSubProjects() {
  try {
    const response: LibrarySubProject[] = yield call(libraryApi.getSubProjects);
    yield put(fetchSubProjectsFinished({ data: response }));
  } catch (error) {
    yield put(fetchSubProjectsFinished({ data: [] }));
  }
}
