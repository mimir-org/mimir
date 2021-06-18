import { call, put } from "redux-saga/effects";
import { Project } from "../../../models";
import {
  get,
  post,
  GetBadResponseData,
  ApiError,
} from "../../../models/webclient";

import {
  FETCHING_PROJECT_SUCCESS_OR_ERROR,
  CREATING_PROJECT_SUCCESS_OR_ERROR,
  SEARCH_PROJECT_SUCCESS_OR_ERROR,
  SAVE_PROJECT_SUCCESS_OR_ERROR,
} from "../../store/project/types";

export function* getProject(action) {
  try {
    const url =
      process.env.REACT_APP_API_BASE_URL + "project/" + action.payload;
    const response = yield call(get, url);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: FETCHING_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        project: null,
        apiError: apiError,
      };

      yield put({
        type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const project = response.data as Project;

    const payload = {
      project: project,
      apiError: null,
    };

    yield put({
      type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: FETCHING_PROJECT_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      project: null,
      apiError: apiError,
    };

    yield put({
      type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
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

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: SEARCH_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        projectList: null,
        apiError: apiError,
      };

      yield put({
        type: SEARCH_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      projectList: response.data,
      apiError: null,
    };

    yield put({
      type: SEARCH_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: SEARCH_PROJECT_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      projectList: null,
      apiError: apiError,
    };
    yield put({
      type: SEARCH_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* createProject(action) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "project";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: CREATING_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        project: null,
        apiError: apiError,
      };

      yield put({
        type: CREATING_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const project = response.data as Project;
    project.edges = [];

    const payload = {
      project: project,
      apiError: null,
    };

    yield put({
      type: CREATING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: CREATING_PROJECT_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      project: null,
      apiError: apiError,
    };
    yield put({
      type: CREATING_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* updateProject(action) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "project/update";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: SAVE_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        project: null,
        apiError: apiError,
      };

      yield put({
        type: SAVE_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const project = response.data as Project;

    const payload = {
      project: project,
      apiError: null,
    };

    yield put({
      type: SAVE_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: SAVE_PROJECT_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      project: null,
      apiError: apiError,
    };

    yield put({
      type: SAVE_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}
