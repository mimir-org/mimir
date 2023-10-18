import { all, takeEvery } from "redux-saga/effects";
import {fetchProjects, fetchProject, saveProject} from "store/reducers/projectReducer";
import {getProjects, getProject, postProject} from "./saga";

export function* projectSaga() {
  yield all([takeEvery(fetchProjects, getProjects)]);
  yield all([takeEvery(fetchProject, getProject)]);
  yield all([takeEvery(saveProject, postProject)]);
}
