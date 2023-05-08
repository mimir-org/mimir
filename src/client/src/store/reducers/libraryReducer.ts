import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LibrarySubProject } from "lib";
import { AspectObjectLibCm, TerminalLibCm, QuantityDatumLibCm, AttributeLibCm } from "@mimirorg/typelibrary-types";

// State definition
export interface LibraryState {
  fetching: string[];
  aspectObjectTypes: AspectObjectLibCm[] | null;
  terminalTypes: TerminalLibCm[] | null;
  quantityDatumTypes: QuantityDatumLibCm[];
  attributeTypes: AttributeLibCm[];
  subProjects: LibrarySubProject[];
}

// Payload action
export interface ActionFetchAspectObjectsFinished {
  data: AspectObjectLibCm[];
}

export interface ActionFetchTerminalsFinished {
  data: TerminalLibCm[];
}

export interface ActionFetchAttributesFinished {
  data: AttributeLibCm[];
}

export interface ActionFetchQuantityDatumsFinished {
  data: QuantityDatumLibCm[];
}

export interface ActionFetchSubProjectsFinished {
  data: LibrarySubProject[];
}

// Initial state
const initState: LibraryState = {
  fetching: [],
  aspectObjectTypes: [],
  terminalTypes: [],
  quantityDatumTypes: [],
  attributeTypes: [],
  subProjects: [],
};

export const librarySlize = createSlice({
  name: "library",
  initialState: initState,
  reducers: {
    fetchAspectObjects: (state) => {
      state.fetching.push(fetchAspectObjects.type);
      state.aspectObjectTypes = [];
    },
    fetchAspectObjectsFinished: (state, action: PayloadAction<ActionFetchAspectObjectsFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchAspectObjects.type);
      state.aspectObjectTypes = action.payload.data;
    },
    fetchTerminals: (state) => {
      state.fetching.push(fetchTerminals.type);
      state.terminalTypes = [];
    },
    fetchTerminalsFinished: (state, action: PayloadAction<ActionFetchTerminalsFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchTerminals.type);
      state.terminalTypes = action.payload.data;
    },
    fetchAttributes: (state) => {
      state.fetching.push(fetchAttributes.type);
      state.attributeTypes = [];
    },
    fetchAttributesFinished: (state, action: PayloadAction<ActionFetchAttributesFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchAttributes.type);
      state.attributeTypes = action.payload.data;
    },
    fetchQuantityDatums: (state) => {
      state.fetching.push(fetchQuantityDatums.type);
      state.quantityDatumTypes = [];
    },
    fetchQuantityDatumsFinished: (state, action: PayloadAction<ActionFetchQuantityDatumsFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchQuantityDatums.type);
      state.quantityDatumTypes = action.payload.data;
    },
    fetchSubProjects: (state) => {
      state.fetching.push(fetchSubProjects.type);
      state.subProjects = [];
    },
    fetchSubProjectsFinished: (state, action: PayloadAction<ActionFetchSubProjectsFinished>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchSubProjects.type);
      state.subProjects = action.payload.data;
    },
  },
});

export const {
  fetchAspectObjects,
  fetchAspectObjectsFinished,
  fetchTerminals,
  fetchTerminalsFinished,
  fetchAttributes,
  fetchAttributesFinished,
  fetchQuantityDatums,
  fetchQuantityDatumsFinished,
  fetchSubProjects,
  fetchSubProjectsFinished,
} = librarySlize.actions;
export default librarySlize.reducer;
