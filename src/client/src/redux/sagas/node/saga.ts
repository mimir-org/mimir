import { put } from "redux-saga/effects";
import { msalInstance } from "../../..";
import { GetDateNowUtc } from "../../../components/flow/helpers";
import { User } from "../../../models";
import * as types from "../../store/project/types";

/**
 * Update updated date and updated by
 */
export function* changeNodeUpdated(action) {

  const account = msalInstance?.getActiveAccount();

  const user: User = {
    username: account.username,
    name: account.name,
  };

  yield put({
    type: types.CHANGE_NODE_UPDATED,
    payload: {
      nodeId: action.payload.nodeId,
      updated: GetDateNowUtc(),
      user: user
    }
  });
}
