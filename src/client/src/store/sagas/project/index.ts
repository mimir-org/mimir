import { all, takeEvery } from "redux-saga/effects";
import { fetchProjects, fetchProject } from "store/reducers/projectReducer";
import { getProjects, getProject } from "./saga";

export function* projectSaga() {
  yield all([takeEvery(fetchProjects, getProjects)]);
  yield all([takeEvery(fetchProject, getProject)]);
}
