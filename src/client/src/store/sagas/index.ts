import { spawn } from "redux-saga/effects";
import { projectSaga } from "./project";
import { commonSaga } from "./common";

export function* sagas() {
  yield spawn(projectSaga);
  yield spawn(commonSaga);
}
