import { all, spawn, takeEvery } from "redux-saga/effects";
import { commonSaga } from "./common";
import { nodeSaga } from "./node";
import { webSocketSaga } from "../../modules/cooperate/saga";
import { searchLibrary, exportLibrary, importLibrary, getTransportTypes, getInterfaceTypes } from "./library/saga";
import { getUser } from "./user/saga";
import { fetchUser } from "../store/user/userSlice";
import {
  fetchLibrary,
  fetchLibraryTransportTypes,
  fetchLibraryInterfaceTypes,
  exportLibrary as exportLibraryAction,
  importLibrary as importLibraryAction
} from "../store/library/librarySlice";
import {
  CREATING_PROJECT,
  FETCHING_PROJECT,
  SEARCH_PROJECT,
  SAVE_PROJECT,
  EXPORT_PROJECT_TO_FILE,
  IMPORT_PROJECT,
  LOCK_NODE,
  COMMIT_PROJECT,
  CREATING_SUB_PROJECT,
  LOCK_EDGE,
  LOCK_ATTRIBUTE,
} from "../store/project/types";
import {
  getProject,
  createProject,
  createSubProject,
  searchProject,
  updateProject,
  exportProjectFile,
  importProject,
  lockNode,
  lockAttribute,
  commitProject,
  lockEdge,
} from "./project/saga";
import {
  getPredefinedAttributes,
  getLocationTypes,
  getInitialData,
  getRDS,
  getTerminals,
  getAttributes,
  saveType,
  getBlobData,
  getSelectedCreateLibraryType,
  getSimpleTypes,
} from "./typeEditor/saga";
import {
  fetchBlobData,
  fetchInitialData,
  fetchSimpleTypes,
  fetchCreateLibraryType,
  saveLibraryType
} from "../../typeEditor/redux/typeEditorSlice";

//TODO: Add takeEvery for LOCK_ on
function* sagas() {
  yield all([
    takeEvery(fetchUser, getUser),
    takeEvery(CREATING_PROJECT, createProject),
    takeEvery(CREATING_SUB_PROJECT, createSubProject),
    takeEvery(FETCHING_PROJECT, getProject),
    takeEvery(SEARCH_PROJECT, searchProject),
    takeEvery(SAVE_PROJECT, updateProject),
    takeEvery(EXPORT_PROJECT_TO_FILE, exportProjectFile),
    takeEvery(IMPORT_PROJECT, importProject),
    takeEvery(LOCK_NODE, lockNode),
    takeEvery(LOCK_EDGE, lockEdge),
    takeEvery(LOCK_ATTRIBUTE, lockAttribute),
    takeEvery(COMMIT_PROJECT, commitProject),
    takeEvery(fetchLibrary, searchLibrary),
    takeEvery(fetchLibraryTransportTypes, getTransportTypes),
    takeEvery(fetchLibraryInterfaceTypes, getInterfaceTypes),
    takeEvery(exportLibraryAction, exportLibrary),
    takeEvery(importLibraryAction, importLibrary),
    takeEvery(fetchInitialData, getInitialData),
    takeEvery(fetchInitialData, getLocationTypes),
    takeEvery(fetchInitialData, getRDS),
    takeEvery(fetchInitialData, getTerminals),
    takeEvery(fetchInitialData, getPredefinedAttributes),
    takeEvery(fetchInitialData, getAttributes),
    takeEvery(fetchSimpleTypes, getSimpleTypes),
    takeEvery(fetchBlobData, getBlobData),
    takeEvery(fetchCreateLibraryType, getSelectedCreateLibraryType),
    takeEvery(saveLibraryType, saveType),
  ]);
}

export function* rootSaga() {
  yield spawn(sagas);
  yield spawn(commonSaga);
  yield spawn(nodeSaga);
  yield spawn(webSocketSaga);
}
