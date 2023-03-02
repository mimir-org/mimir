import { all, spawn, takeEvery } from "redux-saga/effects";
import commonSaga from "./commonSaga";

export function* rootSaga() {
  yield spawn(commonSaga);
}
