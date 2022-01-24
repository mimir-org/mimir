import { all, takeEvery } from "redux-saga/effects";
import * as type from "../redux/types";
import * as func from "./saga";

export function* webSocketSaga() {
  yield all([takeEvery(type.COOPERATE_ADD_NODE, func.nodeAdded), takeEvery(type.COOPERATE_ADD_EDGE, func.edgeAdded)]);
}
