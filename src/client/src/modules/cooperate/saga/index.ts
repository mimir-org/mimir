import { all, takeEvery } from "redux-saga/effects";
import * as type from "../../../redux/store/project/types";
import * as func from "./saga";

export function* webSocketSaga() {
  yield all([
    takeEvery(type.ADD_NODE, func.nodeAdded)
  ]);
}
