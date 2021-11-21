import { all, spawn, takeEvery } from "redux-saga/effects";
import { commonSaga } from "./common";
import { nodeSaga } from "./node";
import { searchLibrary, exportLibrary, importLibrary, getTransportTypes, getInterfaceTypes } from "./library/saga";
import { getUser } from "./user/saga";
import { FETCHING_INITIAL_DATA, SAVE_LIBRARY_TYPE, FETCHING_BLOB_DATA, FETCHING_TYPE } from "../../typeEditor/redux/types";
import { FETCHING_USER } from "../store/userRoles/types";
import {
  FETCHING_LIBRARY,
  EXPORT_LIBRARY,
  IMPORT_LIBRARY,
  FETCHING_LIBRARY_TRANSPORT_TYPES,
  FETCHING_LIBRARY_INTERFACE_TYPES,
} from "../store/library/types";
import {
  CREATING_PROJECT,
  FETCHING_PROJECT,
  SEARCH_PROJECT,
  SAVE_PROJECT,
  EXPORT_PROJECT_TO_FILE,
  IMPORT_PROJECT,
  LOCK_UNLOCK_NODE,
  LOCK_UNLOCK_NODE_ATTRIBUTE,
  COMMIT_PROJECT,
  LOCK_UNLOCK_NODE_TERMINAL_ATTRIBUTE,
  LOCK_UNLOCK_COMPOSITE_ATTRIBUTE,
  LOCK_UNLOCK_INTERFACE_ATTRIBUTE,
  LOCK_UNLOCK_INTERFACE_TERMINAL_ATTRIBUTE,
  LOCK_UNLOCK_TRANSPORT_ATTRIBUTE,
  LOCK_UNLOCK_TRANSPORT_TERMINAL_ATTRIBUTE,
  CREATING_SUB_PROJECT,
} from "./../store/project/types";
import {
  getProject,
  createProject,
  createSubProject,
  searchProject,
  updateProject,
  exportProjectFile,
  importProject,
  lockUnlockNode,
  lockUnlockAttribute,
  commitProject,
} from "./project/saga";
import {
  getPredefinedAttributes,
  getLocationTypes,
  getInitialData,
  getRDS,
  getTerminals,
  getAttributes,
  saveType,
  getblobData,
  getSelectedNode,
  getSimpleTypes,
} from "./typeEditor/saga";

//TODO: Add takeEvery for LOCK_UNLOCK on

function* sagas() {
  yield all([
    takeEvery(FETCHING_LIBRARY, searchLibrary),
    // takeEvery(FETCHING_USER, getUser),
    takeEvery(FETCHING_USER, getUser),
    takeEvery(CREATING_PROJECT, createProject),
    takeEvery(CREATING_SUB_PROJECT, createSubProject),
    takeEvery(FETCHING_PROJECT, getProject),
    takeEvery(SEARCH_PROJECT, searchProject),
    takeEvery(SAVE_PROJECT, updateProject),
    takeEvery(FETCHING_INITIAL_DATA, getInitialData),
    takeEvery(FETCHING_INITIAL_DATA, getLocationTypes),
    takeEvery(FETCHING_INITIAL_DATA, getRDS),
    takeEvery(FETCHING_INITIAL_DATA, getTerminals),
    takeEvery(FETCHING_INITIAL_DATA, getPredefinedAttributes),
    takeEvery(FETCHING_INITIAL_DATA, getAttributes),
    takeEvery(FETCHING_INITIAL_DATA, getSimpleTypes),
    takeEvery(FETCHING_TYPE, getSelectedNode),
    takeEvery(SAVE_LIBRARY_TYPE, saveType),
    takeEvery(EXPORT_PROJECT_TO_FILE, exportProjectFile),
    takeEvery(IMPORT_PROJECT, importProject),
    takeEvery(EXPORT_LIBRARY, exportLibrary),
    takeEvery(LOCK_UNLOCK_NODE, lockUnlockNode),
    takeEvery(LOCK_UNLOCK_NODE_ATTRIBUTE, lockUnlockAttribute),
    takeEvery(LOCK_UNLOCK_TRANSPORT_ATTRIBUTE, lockUnlockAttribute),
    takeEvery(LOCK_UNLOCK_INTERFACE_ATTRIBUTE, lockUnlockAttribute),
    takeEvery(LOCK_UNLOCK_NODE_TERMINAL_ATTRIBUTE, lockUnlockAttribute),
    takeEvery(LOCK_UNLOCK_TRANSPORT_TERMINAL_ATTRIBUTE, lockUnlockAttribute),
    takeEvery(LOCK_UNLOCK_INTERFACE_TERMINAL_ATTRIBUTE, lockUnlockAttribute),
    takeEvery(LOCK_UNLOCK_COMPOSITE_ATTRIBUTE, lockUnlockAttribute),
    takeEvery(IMPORT_LIBRARY, importLibrary),
    takeEvery(FETCHING_BLOB_DATA, getblobData),
    takeEvery(FETCHING_LIBRARY_TRANSPORT_TYPES, getTransportTypes),
    takeEvery(FETCHING_LIBRARY_INTERFACE_TYPES, getInterfaceTypes),
    takeEvery(COMMIT_PROJECT, commitProject),
  ]);
}

export function* rootSaga() {
  yield spawn(sagas);
  yield spawn(commonSaga);
  yield spawn(nodeSaga);
}
