import { all, takeEvery } from "redux-saga/effects";
import { fetchCompanies, fetchCompany, fetchParsers, fetchUser } from "store/reducers/commonReducer";
import { getCompany, getCompanies, getParsers, getUser } from "./saga";

export function* commonSaga() {
  yield all([takeEvery(fetchCompanies, getCompanies)]);
  yield all([takeEvery(fetchCompany, getCompany)]);
  yield all([takeEvery(fetchParsers, getParsers)]);
  yield all([takeEvery(fetchUser, getUser)]);
}
