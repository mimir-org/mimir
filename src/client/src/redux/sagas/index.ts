import { all, spawn, takeEvery } from "redux-saga/effects";
import { projectSaga } from "store/sagas/project";
import { nodeSaga } from "./node";
import { webSocketSaga } from "../../modules/cooperate/saga";
import { commonSaga } from "store/sagas/common";
import {
  exportLibrary,
  getQuantityDatums,
  getTerminals,
  getAttributes,
  importLibrary,
  searchLibrary,
  getSubProjects,
} from "./library/saga";
import {
  exportLibrary as exportLibraryAction,
  fetchLibrary,
  importLibrary as importLibraryAction,
  fetchLibraryTerminals,
  fetchQuantityDatums,
  fetchLibraryAttributeTypes,
  fetchSubProjects,
} from "../store/library/librarySlice";
// import {
//   COMMIT_PROJECT,
//   CREATING_PROJECT,
//   CREATING_SUB_PROJECT,
//   EXPORT_PROJECT_TO_FILE,
//   FETCHING_PROJECT,
//   IMPORT_PROJECT,
//   LOCK_ENTITY,
//   SAVE_PROJECT,
//   SEARCH_PROJECT,
//   CONVERT_SUB_PROJECT_STATUS,
//   MERGE_SUB_PROJECT,
// } from "../store/project/types";
// import {
//   commitProject,
//   createProject,
//   createSubProject,
//   exportProjectFile,
//   getProject,
//   importProject,
//   lockNode,
//   searchProject,
//   updateProject,
//   convertSubProject,
//   mergeSubProject,
// } from "./project/saga";

//TODO: Add takeEvery for LOCK_ on
function* sagas() {
  yield all([
    // takeEvery(fetchUser, getUser),
    // takeEvery(CREATING_PROJECT, createProject),
    // takeEvery(CREATING_SUB_PROJECT, createSubProject),
    // takeEvery(FETCHING_PROJECT, getProject),
    // takeEvery(SEARCH_PROJECT, searchProject),
    // takeEvery(SAVE_PROJECT, updateProject),
    // takeEvery(EXPORT_PROJECT_TO_FILE, exportProjectFile),
    // takeEvery(IMPORT_PROJECT, importProject),
    // takeEvery(LOCK_ENTITY, lockNode),
    // takeEvery(COMMIT_PROJECT, commitProject),
    takeEvery(fetchLibrary, searchLibrary),
    takeEvery(fetchLibraryTerminals, getTerminals),
    takeEvery(fetchLibraryAttributeTypes, getAttributes),
    takeEvery(fetchSubProjects, getSubProjects),
    takeEvery(exportLibraryAction, exportLibrary),
    takeEvery(importLibraryAction, importLibrary),
    takeEvery(fetchQuantityDatums, getQuantityDatums),
    // takeEvery(CONVERT_SUB_PROJECT_STATUS, convertSubProject),
    // takeEvery(MERGE_SUB_PROJECT, mergeSubProject),
  ]);
}

export function* rootSaga() {
  yield spawn(sagas);
  yield spawn(commonSaga);
  yield spawn(nodeSaga);
  yield spawn(webSocketSaga);
  yield spawn(projectSaga);
}
