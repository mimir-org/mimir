import { all, takeEvery } from "redux-saga/effects";
import {
  FETCHING_LIBRARY,
  EXPORT_LIBRARY,
  IMPORT_LIBRARY,
  FETCHING_LIBRARY_TRANSPORT_TYPES,
  FETCHING_LIBRARY_INTERFACE_TYPES,
} from "../store/library/types";
import { FETCHING_USER } from "./../store/user/types";
import {
  CREATING_PROJECT,
  FETCHING_PROJECT,
  SEARCH_PROJECT,
  SAVE_PROJECT,
  EXPORT_PROJECT_TO_FILE,
  IMPORT_PROJECT,
} from "./../store/project/types";
import {
  FETCHING_INITIAL_DATA,
  CHOOSE_ASPECT,
  CHANGE_ASPECT,
  SAVE_LIBRARY_TYPE,
  FETCHING_BLOB_DATA,
  FETCHING_TYPE,
} from "../store/typeEditor/types";
import { FETCHING_CONTRACTORS, FETCHING_STATUSES } from "../store/common/types";

import {
  searchLibrary,
  exportLibrary,
  importLibrary,
  getTransportTypes,
  getInterfaceTypes,
} from "./library/saga";
import { getUser } from "./user/saga";
import {
  getProject,
  createProject,
  searchProject,
  updateProject,
  exportProjectFile,
  importProject,
} from "./project/saga";
import { getContractors, getStatuses } from "./common/saga";
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
} from "./typeEditor/saga";

export function* sagas() {
  yield all([
    takeEvery(FETCHING_LIBRARY, searchLibrary),
    takeEvery(FETCHING_USER, getUser),
    takeEvery(CREATING_PROJECT, createProject),
    takeEvery(FETCHING_PROJECT, getProject),
    takeEvery(SEARCH_PROJECT, searchProject),
    takeEvery(SAVE_PROJECT, updateProject),
    takeEvery(FETCHING_CONTRACTORS, getContractors),
    takeEvery(FETCHING_INITIAL_DATA, getInitialData),
    takeEvery(FETCHING_INITIAL_DATA, getLocationTypes),
    takeEvery(FETCHING_INITIAL_DATA, getRDS),
    takeEvery(FETCHING_INITIAL_DATA, getTerminals),
    takeEvery(FETCHING_INITIAL_DATA, getPredefinedAttributes),
    takeEvery(FETCHING_INITIAL_DATA, getAttributes),
    takeEvery(FETCHING_TYPE, getSelectedNode),
    takeEvery(SAVE_LIBRARY_TYPE, saveType),
    takeEvery(FETCHING_STATUSES, getStatuses),
    takeEvery(EXPORT_PROJECT_TO_FILE, exportProjectFile),
    takeEvery(IMPORT_PROJECT, importProject),
    takeEvery(EXPORT_LIBRARY, exportLibrary),
    takeEvery(IMPORT_LIBRARY, importLibrary),
    takeEvery(FETCHING_BLOB_DATA, getblobData),
    takeEvery(FETCHING_LIBRARY_TRANSPORT_TYPES, getTransportTypes),
    takeEvery(FETCHING_LIBRARY_INTERFACE_TYPES, getInterfaceTypes),
  ]);
}
