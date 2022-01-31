import { call, put } from "redux-saga/effects";
import { Project, ProjectFileAm, ProjectResultAm, WebSocket } from "../../../models";
import { ConvertProject, MapProperties } from ".";
import { saveAs } from "file-saver";
import { IsBlockView } from "../../../helpers";
import { IsPartOf } from "../../../components/flow/helpers";
import {
  ApiError,
  GetApiErrorForBadRequest,
  GetApiErrorForException,
  GetBadResponseData,
  get,
  post,
} from "../../../models/webclient";
import {
  COMMIT_PROJECT_SUCCESS_OR_ERROR,
  CREATING_PROJECT_SUCCESS_OR_ERROR,
  CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
  CommitProject,
  CreateSubProject,
  EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR,
  ExportProjectFileAction,
  FETCHING_PROJECT_SUCCESS_OR_ERROR,
  FetchingProjectAction,
  IMPORT_PROJECT_SUCCESS_OR_ERROR,
  ImportProjectAction,
  LOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
  LOCK_EDGE_SUCCESS_OR_ERROR,
  LOCK_NODE_SUCCESS_OR_ERROR,
  LockAttribute,
  LockEdge,
  LockNode,
  SAVE_PROJECT_SUCCESS_OR_ERROR,
  SEARCH_PROJECT_SUCCESS_OR_ERROR,
  SaveProjectAction,
} from "../../store/project/types";
import Config from "../../../models/Config";

export function* getProject(action: FetchingProjectAction) {
  try {
    const webSocket = new WebSocket();
    if (webSocket.isRunning()) webSocket.setGroup(action.payload.id);

    const url = Config.API_BASE_URL + "project/" + action.payload.id;
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

    const project = response.data;

    MapProperties(project, action.payload.project, {});

    if (!IsBlockView()) {
      project?.edges.forEach((edge) => {
        if (!IsPartOf(edge.fromConnector)) edge.isHidden = true;
      });
    }

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
    const url = Config.API_BASE_URL + "project/search?name=" + action.payload;
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
    const url = Config.API_BASE_URL + "project";
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

export function* createSubProject(action: CreateSubProject) {
  try {
    const url = Config.API_BASE_URL + "subproject";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        project: null,
        apiError: apiError,
      };

      yield put({
        type: CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      apiError: null,
    };

    yield put({
      type: CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      project: null,
      apiError: apiError,
    };
    yield put({
      type: CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* updateProject(action: SaveProjectAction) {
  try {
    const projId = action.payload.project.id;
    const proj = ConvertProject(action.payload.project);
    const url = Config.API_BASE_URL + "project/update/" + projId;
    const response = yield call(post, url, proj);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: SAVE_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        project: action.payload,
        apiError: apiError,
      };

      yield put({
        type: SAVE_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const data: ProjectResultAm = response.data;

    MapProperties(data.project, action.payload.project, data.idChanges);

    const payload = {
      project: data.project,
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

export function* exportProjectFile(action: ExportProjectFileAction) {
  try {
    const url = Config.API_BASE_URL + "project/convert/";
    const response = yield call(post, url, action.payload);

    if (response.status === 400) {
      yield put({
        type: EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR,
        payload: {
          apiError: GetApiErrorForBadRequest(response, EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR),
        },
      });
      return;
    }

    const data = response.data as ProjectFileAm;
    const blob = new Blob([data.fileContent], {
      type: data.fileFormat.contentType,
    });

    saveAs(blob, action.payload.filename + "." + data.fileFormat.fileExtension);

    yield put({
      type: EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR,
      payload: {
        apiError: null,
      },
    });
  } catch (error) {
    yield put({
      type: EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR,
      payload: {
        apiError: GetApiErrorForException(error, EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR),
      },
    });
  }
}

export function* importProject(action: ImportProjectAction) {
  try {
    const url = Config.API_BASE_URL + "project/import/";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: IMPORT_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: IMPORT_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      apiError: null,
    };

    yield put({
      type: IMPORT_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: IMPORT_PROJECT_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: IMPORT_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* commitProject(action: CommitProject) {
  try {
    const url = Config.API_BASE_URL + "commit";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: COMMIT_PROJECT_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: COMMIT_PROJECT_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      apiError: null,
    };

    yield put({
      type: COMMIT_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: COMMIT_PROJECT_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: COMMIT_PROJECT_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* lockNode(action: LockNode) {
  try {
    const url = Config.API_BASE_URL + "lock/node";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: LOCK_NODE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: LOCK_NODE_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      apiError: null,
    };
    yield put({
      type: LOCK_NODE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: LOCK_NODE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: LOCK_NODE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* lockEdge(action: LockEdge) {
  try {
    const url = Config.API_BASE_URL + "lock/edge";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: LOCK_EDGE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: LOCK_EDGE_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      apiError: null,
    };
    yield put({
      type: LOCK_EDGE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: LOCK_EDGE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: LOCK_EDGE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* lockAttribute(action: LockAttribute) {
  try {
    const url = Config.API_BASE_URL + "lock/attribute";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: LOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: LOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
        payload: payload,
      });
    }
  } catch (error) {
    const apiError = {
      key: LOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: LOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}
