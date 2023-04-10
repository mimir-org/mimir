import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DialogType, ModuleDescription, User, ViewType } from "lib";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

// State definition
export interface CommonState {
  fetching: string[];
  companies: MimirorgCompanyCm[];
  company: MimirorgCompanyCm;
  parsers: ModuleDescription[];
  user: User;
  view: ViewType;
  dialog: DialogType;
}

// Payload action
export interface ActionFetchCompaniesFinished {
  companies: MimirorgCompanyCm[];
}

export interface ActionFetchCompanyFinished {
  company: MimirorgCompanyCm;
}

export interface ActionFetchParsersFinished {
  parsers: ModuleDescription[];
}

export interface ActionFetchUserFinished {
  user: User;
}

export interface ActionSetViewType {
  view: ViewType;
}

export interface ActionSetDialogType {
  dialog: DialogType;
}

// Initial state
const initState: CommonState = {
  fetching: [],
  companies: [],
  company: null,
  parsers: [],
  user: null,
  view: ViewType.Home,
  dialog: DialogType.None,
};

export const commonSlize = createSlice({
  name: "project",
  initialState: initState,
  reducers: {
    fetchCompanies: (state) => {
      state.fetching.push(fetchCompanies.type);
      state.companies = [];
    },
    fetchCompaniesFinished: (state, action: PayloadAction<ActionFetchCompaniesFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchCompanies.type);
      state.companies = action.payload.companies;
    },
    fetchCompany: (state) => {
      state.fetching.push(fetchCompany.type);
      state.company = null;
    },
    fetchCompanyFinished: (state, action: PayloadAction<ActionFetchCompanyFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchCompany.type);
      state.company = action.payload.company;
    },
    fetchParsers: (state) => {
      state.fetching.push(fetchParsers.type);
      state.parsers = [];
    },
    fetchParsersFinished: (state, action: PayloadAction<ActionFetchParsersFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchParsers.type);
      state.parsers = action.payload.parsers;
    },
    fetchUser: (state) => {
      state.fetching.push(fetchUser.type);
      state.user = null;
    },
    fetchUserFinished: (state, action: PayloadAction<ActionFetchUserFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchUser.type);
      state.user = action.payload.user;
    },
    setViewType: (state, action: PayloadAction<ActionSetViewType>) => {
      state.view = action.payload.view;
    },
    setDialogType: (state, action: PayloadAction<ActionSetDialogType>) => {
      state.dialog = action.payload.dialog;
    },
  },
});

export const {
  fetchCompanies,
  fetchCompaniesFinished,
  fetchCompany,
  fetchCompanyFinished,
  fetchParsers,
  fetchParsersFinished,
  fetchUser,
  fetchUserFinished,
  setViewType,
  setDialogType,
} = commonSlize.actions;
export default commonSlize.reducer;
