import { spawn } from "redux-saga/effects";
import { projectSaga } from "./project";
import { commonSaga } from "./common";
import { librarySaga } from "./library";

export function* sagas() {
  yield spawn(projectSaga);
  yield spawn(commonSaga);
  yield spawn(librarySaga);
}
