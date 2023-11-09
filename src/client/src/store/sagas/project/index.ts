import { all, takeEvery } from "redux-saga/effects";
import {fetchProjects, fetchProject, saveProjectInDb, updateProjectInDb} from "store/reducers/projectReducer";
import {getProjects, getProject, saveProject, updateProject} from "./saga";

export function* projectSaga() {
  yield all([takeEvery(fetchProjects, getProjects)]);
  yield all([takeEvery(fetchProject, getProject)]);
  yield all([takeEvery(saveProjectInDb, saveProject)]);
  yield all([takeEvery(updateProjectInDb, updateProject)]);
}
