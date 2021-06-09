import { all, takeEvery } from "redux-saga/effects";
import { FETCHING_LIBRARY } from "../store/library/types";
import { FETCHING_USER } from "./../store/user/types";
import {
  CREATING_PROJECT,
  FETCHING_PROJECT,
  SEARCH_PROJECT,
  SAVE_PROJECT,
} from "./../store/project/types";
import {
  FETCHING_INITIAL_DATA,
  FETCHING_RDS,
  FETCHING_TERMINALS,
} from "../store/typeEditor/types";
import { FETCHING_CONTRACTORS } from "../store/common/types";

import { searchLibrary } from "./library/saga";
import { getUser } from "./user/saga";
import {
  getProject,
  createProject,
  searchProject,
  updateProject,
} from "./project/saga";
import { getContractors } from "./common/saga";
import { getInitialData, getRDS, getTerminals } from "./typeEditor/saga";

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
    takeEvery(FETCHING_RDS, getRDS),
    takeEvery(FETCHING_TERMINALS, getTerminals),
  ]);
}
