import { all, takeEvery } from "redux-saga/effects";
import { getAttributeFilters, getCollaborationPartners, getParsers } from "./saga";
import {
  fetchCollaborationPartners,
  fetchCombinedAttributeFilters,
  fetchParsers
} from "../../store/common/commonSlice";

export function* commonSaga() {
  yield all([
    takeEvery(fetchCollaborationPartners, getCollaborationPartners),
    takeEvery(fetchCombinedAttributeFilters, getAttributeFilters),
    takeEvery(fetchParsers, getParsers),
  ]);
}
