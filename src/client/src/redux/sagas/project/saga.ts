import { call, put } from "redux-saga/effects";
import { Project } from "../../../models/project";
import { get, post } from "../../../models/webclient";
import { GetProject } from "../../store/localStorage";
import {
  FETCHING_PROJECT_SUCCESS_OR_ERROR,
  CREATING_PROJECT_SUCCESS_OR_ERROR,
  SEARCH_PROJECT_SUCCESS_OR_ERROR,
  SAVE_PROJECT_SUCCESS_OR_ERROR,
  ProjectState,
} from "../../store/project/types";

export function* getProject(action) {
  try {
    let project = GetProject();

    if (!project) {
      const url =
        process.env.REACT_APP_API_BASE_URL + "project/" + action.payload;
      const response = yield call(get, url);
      project = response.data as Project;
    }

    const payload = {
      project: project,
      hasError: false,
      errorMsg: null,
      fetching: false,
      creating: false,
    };

    yield put({
      type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  } catch (error) {
    const payload = {
      project: null,
      hasError: true,
      errorMsg: error,
      fetching: false,
      creating: false,
    };

    yield put({
      type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  }
}

export function* searchProject(action) {
  try {
    const url =
      process.env.REACT_APP_API_BASE_URL +
      "project/search?name=" +
      action.payload;
    const response = yield call(get, url);
    const payload = {
      project: null,
      hasError: false,
      errorMsg: null,
      fetching: false,
      creating: false,
      projectList: response.data,
    };

    yield put({
      type: SEARCH_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  } catch (error) {
    const payload = {
      project: null,
      hasError: true,
      errorMsg: error,
      fetching: false,
      creating: false,
      projectList: null,
    };
    yield put({
      type: SEARCH_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  }
}

export function* createProject(action) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "project";
    const response = yield call(post, url, action.payload);
    const project = response.data as Project;

    const payload = {
      project: project,
      hasError: false,
      errorMsg: null,
      fetching: false,
      creating: false,
    };

    yield put({
      type: CREATING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  } catch (error) {
    const payload = {
      project: null,
      hasError: true,
      errorMsg: error,
      fetching: false,
      creating: false,
    };

    yield put({
      type: CREATING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  }
}

export function* updateProject(action) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "project/update";
    const response = yield call(post, url, action.payload);
    const project = response.data as Project;

    const payload = {
      project: project,
      hasError: false,
      errorMsg: null,
      fetching: false,
      creating: false,
    };

    yield put({
      type: SAVE_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  } catch (error) {
    const payload = {
      project: action.payload,
      hasError: true,
      errorMsg: error,
      fetching: false,
      creating: false,
    };

    yield put({
      type: SAVE_PROJECT_SUCCESS_OR_ERROR,
      payload: payload as ProjectState,
    });
  }
}
