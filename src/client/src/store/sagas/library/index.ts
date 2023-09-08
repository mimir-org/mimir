import { all, takeEvery } from "redux-saga/effects";
import {
  fetchAspectObjects,
  fetchAttributes,
  fetchTerminals,
  fetchQuantityDatums,
  fetchSubProjects,
} from "store/reducers/libraryReducer";
import { getAspectObjects, getAttributes, getTerminals, getQuantityDatums, getSubProjects } from "./saga";

export function* librarySaga() {
  yield all([takeEvery(fetchAspectObjects, getAspectObjects)]);
  yield all([takeEvery(fetchAttributes, getAttributes)]);
  yield all([takeEvery(fetchTerminals, getTerminals)]);
  yield all([takeEvery(fetchQuantityDatums, getQuantityDatums)]);
  yield all([takeEvery(fetchSubProjects, getSubProjects)]);
}
