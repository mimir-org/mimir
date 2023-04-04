import { ProjectSearchResult } from "lib";
import { projectApi } from "store/api";
import { FetchProjectsAction, fetchProjectsFinished } from "store/reducers/projectReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* getProjects(action: PayloadAction<FetchProjectsAction>) {
  try {
    console.log("Testing");
    const response: ProjectSearchResult = yield call(projectApi.getProjects, action.payload.name);
    yield put(fetchProjectsFinished({ projects: response.projects }));
  } catch (error) {
    yield put(fetchProjectsFinished({ projects: [] }));
  }
}
