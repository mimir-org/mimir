import { all } from "redux-saga/effects";
// import * as type from "../../store/project/types";
// import * as func from "./saga";

export function* nodeSaga() {
  yield all([
    // takeEvery(type.CHANGE_NODE_ATTRIBUTE_VALUE, func.changeNodeUpdated),
    // takeEvery(type.CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE, func.changeNodeUpdated),
    // takeEvery(type.CHANGE_NODE_PROP_VALUE, func.changeNodeUpdated),
  ]);
}
