import { all, spawn, takeEvery } from "redux-saga/effects";
import { commonSaga } from "./common";
import { nodeSaga } from "./node";
import { webSocketSaga } from "../../modules/cooperate/saga";
import { getUser } from "./user/saga";
import { fetchUser } from "../store/user/userSlice";
import {
  deleteLibraryItem,
  exportLibrary,
  getInterfaceTypes,
  getTerminals,
  getTransportTypes,
  importLibrary,
  searchLibrary,
} from "./library/saga";
import {
  exportLibrary as exportLibraryAction,
  fetchLibrary,
  fetchLibraryInterfaceTypes,
  fetchLibraryTransportTypes,
  importLibrary as importLibraryAction,
  deleteLibraryItem as deleteLibraryAction,
  fetchLibraryTerminals,
} from "../store/library/librarySlice";
import {
  COMMIT_PROJECT,
  CREATING_PROJECT,
  CREATING_SUB_PROJECT,
  EXPORT_PROJECT_TO_FILE,
  FETCHING_PROJECT,
  IMPORT_PROJECT,
  LOCK_ENTITY,
  SAVE_PROJECT,
  SEARCH_PROJECT,
} from "../store/project/types";
import {
  commitProject,
  createProject,
  createSubProject,
  exportProjectFile,
  getProject,
  importProject,
  lockNode,
  searchProject,
  updateProject,
} from "./project/saga";

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
    takeEvery(LOCK_ENTITY, lockNode),
    takeEvery(COMMIT_PROJECT, commitProject),
    takeEvery(fetchLibrary, searchLibrary),
    takeEvery(fetchLibraryTransportTypes, getTransportTypes),
    takeEvery(fetchLibraryInterfaceTypes, getInterfaceTypes),
    takeEvery(fetchLibraryTerminals, getTerminals),
    takeEvery(exportLibraryAction, exportLibrary),
    takeEvery(importLibraryAction, importLibrary),
    takeEvery(deleteLibraryAction, deleteLibraryItem),
  ]);
}

export function* rootSaga() {
  yield spawn(sagas);
  yield spawn(commonSaga);
  yield spawn(nodeSaga);
  yield spawn(webSocketSaga);
}
