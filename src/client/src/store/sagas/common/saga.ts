import { ModuleDescription, User } from "lib";
import { commonApi } from "store/api";
import {
  fetchCompaniesFinished,
  fetchCompanyFinished,
  fetchParsersFinished,
  fetchUserFinished,
} from "store/reducers/commonReducer";
import { call, put } from "redux-saga/effects";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

export function* getCompany() {
  try {
    const response: MimirorgCompanyCm = yield call(commonApi.getCompany);
    yield put(fetchCompanyFinished({ company: response }));
  } catch (error) {
    yield put(fetchCompanyFinished({ company: null }));
  }
}

export function* getCompanies() {
  try {
    const response: MimirorgCompanyCm[] = yield call(commonApi.getCompanies);
    yield put(fetchCompaniesFinished({ companies: response }));
  } catch (error) {
    yield put(fetchCompaniesFinished({ companies: [] }));
  }
}

export function* getParsers() {
  try {
    const response: ModuleDescription[] = yield call(commonApi.getParsers);
    yield put(fetchParsersFinished({ parsers: response }));
  } catch (error) {
    yield put(fetchParsersFinished({ parsers: [] }));
  }
}

export function* getUser() {
  try {
    const response: User = yield call(commonApi.getUser);
    yield put(fetchUserFinished({ user: response }));
  } catch (error) {
    yield put(fetchUserFinished({ user: null }));
  }
}
