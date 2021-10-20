import { all, takeEvery } from "redux-saga/effects";
import * as type from "../../store/common/types";
import * as func from "./saga";

export function* commonSaga() {
  yield all([
    takeEvery(type.FETCHING_CONTRACTORS, func.getContractors),
    takeEvery(type.FETCHING_STATUSES, func.getStatuses),
    takeEvery(type.FETCHING_COMBINED_ATTRIBUTE_FILTERS, func.getAttributeFilters),
  ]);
}
