import { CombinedAttributeFilter, ModuleDescription } from "../../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CommonState,
  FetchCollaboratorPartnersFinished,
  FetchCombinedAttributeFilterFinished,
  FetchParsersFinished
} from "./types";

const initialCommonState: CommonState = {
  fetching: false,
  collaborationPartners: [],
  parsers: [] as ModuleDescription[],
  filters: [] as CombinedAttributeFilter[],
  statuses: [],
  apiError: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialCommonState,
  reducers: {
    fetchCollaborationPartners: (state) => {
      state.fetching = true;
      state.collaborationPartners = [];
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchCollaborationPartnersSuccessOrError.type)
        : state.apiError;
    },
    fetchCollaborationPartnersSuccessOrError: (state, action: PayloadAction<FetchCollaboratorPartnersFinished>) => {
      state.fetching = false;
      state.collaborationPartners = action.payload.collaborationPartners;
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
  fetchCollaborationPartners,
  fetchCollaborationPartnersSuccessOrError,
  fetchCombinedAttributeFilters,
  fetchCombinedAttributeFiltersSuccessOrError,
  fetchParsers,
  fetchParsersSuccessOrError,
  deleteCommonError,
} = commonSlice.actions;

export default commonSlice.reducer;
