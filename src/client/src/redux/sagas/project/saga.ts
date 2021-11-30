import { call, put } from "redux-saga/effects";
import { Project, WebSocket } from "../../../models";
import { ConvertProject, InitializeProject } from ".";
import { saveAs } from "file-saver";
import { get, post, GetBadResponseData, ApiError } from "../../../models/webclient";
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
  LockUnlockNode,
  LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR,
  LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
  LockUnlockAttributeUnion,
  CreateSubProject,
  CREATING_SUB_PROJECT_SUCCESS_OR_ERROR,
} from "../../store/project/types";

export function* getProject(action) {
  try {
    const webSocket = new WebSocket();
    if (webSocket.isRunning())
      webSocket.setGroup(action.payload);

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

    const project = InitializeProject(response.data);

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

    const project = InitializeProject(response.data);

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
    const proj = ConvertProject(action.payload.project);
    proj.isSubProject = action.payload.isSubProject;
    const blob = new Blob([JSON.stringify(proj, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, action.payload.fileName + ".json");
  } catch (error) {
    const apiError = {
      key: EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR,
      payload: payload,
    });
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

export function* lockUnlockNode(action: LockUnlockNode) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "project/node/lockunlock";
    const response = yield call(post, url, action.payload);

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR,
        payload: payload,
      });
      return;
    }

    const payload = {
      apiError: null,
    };
    yield put({
      type: LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  } catch (error) {
    const apiError = {
      key: LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}

export function* lockUnlockAttribute(action: LockUnlockAttributeUnion) {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "project/attribute/lockunlock";
    const { id, isLocked } = action.payload;
    const response = yield call(post, url, { id, isLocked });

    // This is a bad request
    if (response.status === 400) {
      const data = GetBadResponseData(response);

      const apiError = {
        key: LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
        errorMessage: data.title,
        errorData: data,
      } as ApiError;

      const payload = {
        apiError: apiError,
      };

      yield put({
        type: LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
        payload: payload,
      });
    }
  } catch (error) {
    const apiError = {
      key: LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
      errorMessage: error.message,
      errorData: null,
    } as ApiError;

    const payload = {
      apiError: apiError,
    };

    yield put({
      type: LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR,
      payload: payload,
    });
  }
}
