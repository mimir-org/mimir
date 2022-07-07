import { all, takeEvery } from "redux-saga/effects";
import { getAttributeFilters, getCompanies, getParsers, getCompany } from "./saga";
import { fetchCompany, fetchCompanies, fetchCombinedAttributeFilters, fetchParsers } from "../../store/common/commonSlice";

export function* commonSaga() {
  yield all([
    takeEvery(fetchCompany, getCompany),
    takeEvery(fetchCompanies, getCompanies),
    takeEvery(fetchCombinedAttributeFilters, getAttributeFilters),
    takeEvery(fetchParsers, getParsers),
  ]);
}
