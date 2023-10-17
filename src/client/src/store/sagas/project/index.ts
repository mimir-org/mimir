import { all, takeEvery } from "redux-saga/effects";
import {fetchProjects, fetchProject, updateProject} from "store/reducers/projectReducer";
import {getProjects, getProject, saveProject} from "./saga";

export function* projectSaga() {
  yield all([takeEvery(fetchProjects, getProjects)]);
  yield all([takeEvery(fetchProject, getProject)]);
  yield all([takeEvery(updateProject, saveProject)]);
}
