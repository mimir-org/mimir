import { all, takeEvery } from "redux-saga/effects";
import { FETCHING_LIBRARY } from "../store/library/types";
import { FETCHING_USER } from "./../store/user/types";
import {
    CREATING_PROJECT,
    FETCHING_PROJECT,
    SEARCH_PROJECT,
    SAVE_PROJECT,
    EXPORT_PROJECT_TO_FILE,
    IMPORT_PROJECT
} from "./../store/project/types";
import {
    FETCHING_INITIAL_DATA,
    CHANGE_ASPECT,
    CREATING_TYPE,
    UPDATING_TYPE,
} from "../store/typeEditor/types";
import { FETCHING_CONTRACTORS, FETCHING_STATUSES } from "../store/common/types";

import { searchLibrary } from "./library/saga";
import { getUser } from "./user/saga";
import {
    getProject,
    createProject,
    searchProject,
    updateProject,
    exportProjectFile,
    importProject
} from "./project/saga";
import { getContractors, getStatuses } from "./common/saga";
import {
    getPredefinedAttributes,
    getLocationTypes,
    getInitialData,
    getRDS,
    getTerminals,
    getAttributes,
    createType,
    updateType,
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
        takeEvery(CHANGE_ASPECT, getPredefinedAttributes),
        takeEvery(CHANGE_ASPECT, getLocationTypes),
        takeEvery(CHANGE_ASPECT, getRDS),
        takeEvery(CHANGE_ASPECT, getTerminals),
        takeEvery(CHANGE_ASPECT, getAttributes),
        takeEvery(CREATING_TYPE, createType),
        takeEvery(UPDATING_TYPE, updateType),
        takeEvery(FETCHING_STATUSES, getStatuses),
        takeEvery(EXPORT_PROJECT_TO_FILE, exportProjectFile),
        takeEvery(IMPORT_PROJECT, importProject),
    ]);
}
