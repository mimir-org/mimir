import { CombinedAttributeFilter } from "../../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModuleDescription } from "@mimirorg/modelbuilder-types";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";
import {
  CommonState,
  FetchCompaniesFinished,
  FetchCombinedAttributeFilterFinished,
  FetchParsersFinished,
  FetchCompanyFinished,
} from "./types";

const initialCommonState: CommonState = {
  fetching: false,
  companies: [] as MimirorgCompanyCm[],
  company: {} as MimirorgCompanyCm,
  parsers: [] as ModuleDescription[],
  filters: [] as CombinedAttributeFilter[],
  statuses: [],
  apiError: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialCommonState,
  reducers: {
    fetchCompanies: (state) => {
      state.fetching = true;
      state.companies = [];
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchCompaniesSuccessOrError.type)
        : state.apiError;
    },
    fetchCompany: (state) => {
      state.fetching = true;
      state.company = {} as MimirorgCompanyCm;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchCompaniesSuccessOrError.type)
        : state.apiError;
    },
    fetchCompaniesSuccessOrError: (state, action: PayloadAction<FetchCompaniesFinished>) => {
      state.fetching = false;
      state.companies = action.payload.companies;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchCompanySuccessOrError: (state, action: PayloadAction<FetchCompanyFinished>) => {
      state.fetching = false;
      state.company = action.payload.company;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchCombinedAttributeFilters: (state) => {
      state.fetching = true;
      state.filters = [];
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchCombinedAttributeFiltersSuccessOrError.type)
        : state.apiError;
    },
    fetchCombinedAttributeFiltersSuccessOrError: (state, action: PayloadAction<FetchCombinedAttributeFilterFinished>) => {
      state.fetching = false;
      state.filters = action.payload.filters;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchParsers: (state) => {
      state.fetching = true;
      state.parsers = [];
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchParsersSuccessOrError.type)
        : state.apiError;
    },
    fetchParsersSuccessOrError: (state, action: PayloadAction<FetchParsersFinished>) => {
      state.fetching = false;
      state.parsers = action.payload.parsers;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    deleteCommonError: (state, action: PayloadAction<string>) => {
      state.apiError = state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload) : state.apiError;
    },
  },
});

export const {
  fetchCompany,
  fetchCompanies,
  fetchCompaniesSuccessOrError,
  fetchCompanySuccessOrError,
  fetchCombinedAttributeFilters,
  fetchCombinedAttributeFiltersSuccessOrError,
  fetchParsers,
  fetchParsersSuccessOrError,
  deleteCommonError,
} = commonSlice.actions;

export default commonSlice.reducer;
