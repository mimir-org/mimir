import { spawn } from "redux-saga/effects";
import { projectSaga } from "./project";

export function* sagas() {
  yield spawn(projectSaga);
}
