import { call, put } from "redux-saga/effects";
import { Project, ProjectFileAm, WebSocket } from "../../../models";
import { ConvertProject } from ".";
import { saveAs } from "file-saver";
import { IsBlockView } from "../../../helpers";
import { IsPartOf } from "../../../components/flow/helpers";
import {
  get,
  post,
  GetBadResponseData,
  ApiError,
  GetBadRequestPayload,
  GetErrorResponsePayload,
} from "../../../models/webclient";
import {
  FETCHING_PROJECT_SUCCESS_OR_ERROR,
  CREATING_PROJECT_SUCCESS_OR_ERROR,
  SEARCH_PROJECT_SUCCESS_OR_ERROR,
  SAVE_PROJECT_SUCCESS_OR_ERROR,
  ExportProjectFileAction,
  ImportProjectAction,
  EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR,
  IMPORT_PROJECT_SUCCESS_OR_ERROR,
  COMMIT_PROJECT_SUCCESS_OR_ERROR,
  CommitProject,
  LockNode,
  LOCK_NODE_SUCCESS_OR_ERROR,
  LOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
  CreateSubProject,
  CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
  LockEdge,
  LOCK_EDGE_SUCCESS_OR_ERROR,
  LockAttribute,
} from "../../store/project/types";

export function* getProject(action) {
  try {
    const webSocket = new WebSocket();
    if (webSocket.isRunning()) webSocket.setGroup(action.payload);

    const url = process.env.REACT_APP_API_BASE_URL + "project/" + action.payload;
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
    const url = process.env.REACT_APP_API_BASE_URL + "project/search?name=" + action.payload;
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

export function* createSubProject(action: CreateSubProject) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "subproject";
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

export function* updateProject(action) {
  try {
    const projId = action.payload.id;
    const proj = ConvertProject(action.payload);

    const url = process.env.REACT_APP_API_BASE_URL + "project/update/" + projId;
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

    const project = response.data;

    if (project.nodes && action.payload.nodes) {
      project.nodes.forEach((node) => {
        const oldNode = action.payload.nodes.find((x) => x.id === node.id);
        if (oldNode) {
          node.isHidden = oldNode.isHidden;
          node.isBlockSelected = oldNode.isBlockSelected;
          node.isSelected = oldNode.isSelected;
        }
      });
    }

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
    const url = process.env.REACT_APP_API_BASE_URL + "project/convert/";
    const response = yield call(post, url, action.payload);

    if (response.status === 400) {
      yield put(GetBadRequestPayload(response, EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR));
      return;
    }

    var data = response.data as ProjectFileAm;
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
    yield put(GetErrorResponsePayload(error, EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR, {}));
  }
}

export function* importProject(action: ImportProjectAction) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "project/import/";
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
    const url = process.env.REACT_APP_API_BASE_URL + "commit";
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
    const url = process.env.REACT_APP_API_BASE_URL + "lock/node";
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
    const url = process.env.REACT_APP_API_BASE_URL + "lock/edge";
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
    const url = process.env.REACT_APP_API_BASE_URL + "lock/attribute";
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
