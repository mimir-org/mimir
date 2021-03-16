import { call, put } from "redux-saga/effects";
import {
  FETCHING_WORKSPACE_SUCCESS_OR_ERROR,
  WorkspaceActionTypes,
  WorkspaceState,
} from "./../../store/workspace/types";
import { Workspace } from "../../../models/workspace";
import WorkspaceDataset from "../../../data/WorkspaceDataset";
import { WorkspaceService } from "../../../services/workspaceService";

export function* getWorkspace(action: WorkspaceActionTypes) {
  try {
    const data = yield call(WorkspaceDataset.get);
    const workspace = data as Workspace;
    const workspaceService = new WorkspaceService(workspace);

    // Need to create proxy connectors for all nodes
    let aspect = workspace.aspects.filter(
      (x) => x.aspect === "1" && x.category === "1"
    )[0];
    workspaceService.getProxyNodes(aspect);

    const payload = {
      workspace: workspace,
      hasError: false,
      errorMsg: null,
      fetching: false,
    };

    yield put({
      type: FETCHING_WORKSPACE_SUCCESS_OR_ERROR,
      payload: payload as WorkspaceState,
    });
  } catch (error) {
    console.log("Error getting graph from saga: " + error);

    const payload = {
      workspace: null,
      hasError: true,
      errorMsg: error,
      fetching: false,
    };

    yield put({
      type: FETCHING_WORKSPACE_SUCCESS_OR_ERROR,
      payload: payload as WorkspaceState,
    });
  }
}
