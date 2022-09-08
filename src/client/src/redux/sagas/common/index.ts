import { all, takeEvery } from "redux-saga/effects";
import { getCompanies, getParsers, getCompany } from "./saga";
import { fetchCompany, fetchCompanies, fetchParsers } from "../../store/common/commonSlice";

export function* commonSaga() {
  yield all([takeEvery(fetchCompany, getCompany), takeEvery(fetchCompanies, getCompanies), takeEvery(fetchParsers, getParsers)]);
}
