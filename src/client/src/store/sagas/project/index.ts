import { all, takeEvery } from "redux-saga/effects";
import { fetchProjects } from "store/reducers/projectReducer";
import { getProjects } from "./saga";

export function* projectSaga() {
  yield all([takeEvery(fetchProjects, getProjects)]);
}
