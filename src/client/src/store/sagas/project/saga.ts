import { Project, ProjectSearchResult } from "lib";
import { projectApi } from "store/api";
import {
  FetchProjectAction,
  fetchProjectFinished,
  FetchProjectsAction,
  fetchProjectsFinished,
  saveProjectDbFinished,
  saveProjectToDbAction,
  updateProjectDbAction,
  updateProjectInDb,
  updateProjectInDbFinished,
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

export function* saveProject(action: PayloadAction<saveProjectToDbAction>) {
  try{
    const response: string = yield call(projectApi.createProject, action.payload.project);
    yield put(saveProjectDbFinished({guid: response}));
  }
  catch (error){
    console.log(error);
  }
}

export function* updateProject(action: PayloadAction<updateProjectDbAction>) {
  try{
    const response: string = yield call(projectApi.updateProject, action.payload.project);
    yield put(updateProjectInDbFinished({status: response}));
  }catch (error) {
    console.log(error);
  }
}