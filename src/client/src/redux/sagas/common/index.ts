import { all, takeEvery } from "redux-saga/effects";
import { getAttributeFilters, getCollaborationPartners, getParsers, getStatuses } from "./saga";
import {
  fetchCollaborationPartners,
  fetchCombinedAttributeFilters,
  fetchParsers,
  fetchStatuses,
} from "../../store/common/commonSlice";

export function* commonSaga() {
  yield all([
    takeEvery(fetchCollaborationPartners, getCollaborationPartners),
    takeEvery(fetchStatuses, getStatuses),
    takeEvery(fetchCombinedAttributeFilters, getAttributeFilters),
    takeEvery(fetchParsers, getParsers),
  ]);
}
