import { Project, ProjectSearchResult } from "lib";
import { projectApi } from "store/api";
import {
  FetchProjectAction,
  fetchProjectFinished,
  FetchProjectsAction,
  fetchProjectsFinished,
  SaveProjectAction,
  saveProjectFinished,
} from "store/reducers/projectReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* getProject(action: PayloadAction<FetchProjectAction>) {
  try {
    const response: Project = yield call(projectApi.getProject, action.payload.id);
    yield put(fetchProjectFinished({ project: response }));
  } catch (error) {
    yield put(fetchProjectFinished({ project: null }));
  }
}

export function* getProjects(action: PayloadAction<FetchProjectsAction>) {
  try {
    const response: ProjectSearchResult = yield call(projectApi.getProjects, action.payload.name);
    yield put(fetchProjectsFinished({ projects: response.projects }));
  } catch (error) {
    yield put(fetchProjectsFinished({ projects: [] }));
  }
}

export function* postProject(action: PayloadAction<SaveProjectAction>) {
  try {
    const response: string = yield call(projectApi.saveProject, action.payload.project);
    yield put(saveProjectFinished({serverResponse: response}));
  }catch (error) {
    yield put(saveProjectFinished({serverResponse: ""}));
  }
}