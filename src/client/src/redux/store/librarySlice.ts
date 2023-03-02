import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import {
  AddToCollectionsTypes,
  FetchAttributes,
  FetchInterfaceTypes,
  FetchLibrary,
  FetchQuantityDatums,
  FetchSubProjects,
  FetchTerminals,
  FetchTransportTypes,
  LibraryState,
} from "../../lib/types/redux/librarySliceTypes";
import { ApiError } from "../../lib/types/ApiTypes";
import { Collection } from "../../lib/types/Collection";

const initialLibraryState: LibraryState = {
  fetching: false,
  libNodes: [],
  apiError: [],
  collections: [],
  transportTypes: [],
  interfaceTypes: [],
  terminals: [],
  quantityDatums: [],
  attributeTypes: [],
  subProjects: [],
};

export const librarySlice = createSlice({
  name: "library",
  initialState: initialLibraryState,
  reducers: {
    fetchLibrary: (state) => {
      state.fetching = true;
      (state.libNodes = [] as NodeLibCm[]),
        (state.apiError = state.apiError
          ? state.apiError.filter((elem) => elem.key !== fetchLibrarySuccessOrError.type)
          : state.apiError);
    },
    fetchLibrarySuccessOrError: (state, action: PayloadAction<FetchLibrary>) => {
      state.fetching = false;
      state.libNodes = action.payload.libNodes;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    exportLibrary: (state, _action: PayloadAction<string>) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== exportLibrarySuccessOrError.type)
        : state.apiError;
    },
    exportLibrarySuccessOrError: (state, action: PayloadAction<ApiError>) => {
      state.fetching = false;
      action.payload && state.apiError.push(action.payload);
    },
    importLibrary: (state, _action: PayloadAction<File>) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== importLibrarySuccessOrError.type)
        : state.apiError;
    },
    importLibrarySuccessOrError: (state, action: PayloadAction<ApiError>) => {
      state.fetching = false;
      action.payload && state.apiError.push(action.payload);
    },
    fetchLibraryTransportTypes: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchLibraryTransportTypesSuccessOrError.type)
        : state.apiError;
    },
    fetchLibraryTransportTypesSuccessOrError: (state, action: PayloadAction<FetchTransportTypes>) => {
      state.fetching = false;
      state.transportTypes = action.payload.transportTypes;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchLibraryTerminals: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchLibraryTerminalsSuccessOrError.type)
        : state.apiError;
    },
    fetchLibraryTerminalsSuccessOrError: (state, action: PayloadAction<FetchTerminals>) => {
      state.fetching = false;
      state.terminals = action.payload.terminals;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchLibraryAttributeTypes: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchLibraryAttributeTypesSuccessOrError.type)
        : state.apiError;
    },
    fetchLibraryAttributeTypesSuccessOrError: (state, action: PayloadAction<FetchAttributes>) => {
      state.fetching = false;
      state.attributeTypes = action.payload.attributeTypes;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchLibraryInterfaceTypes: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchLibraryInterfaceTypesSuccessOrError.type)
        : state.apiError;
    },
    fetchLibraryInterfaceTypesSuccessOrError: (state, action: PayloadAction<FetchInterfaceTypes>) => {
      state.fetching = false;
      state.interfaceTypes = action.payload.interfaceTypes;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.collections?.push(action.payload);
    },
    addToCollections: (state, action: PayloadAction<AddToCollectionsTypes>) => {
      state.collections = state.collections.map((collection) => {
        if (action.payload.collectionIds.includes(collection.id)) {
          action.payload.libNodes.forEach((type) => {
            return !collection.libNodes.includes(type) ? collection.libNodes.push(type) : null;
          });
        }
        return collection;
      });
    },
    fetchQuantityDatumsSuccessOrError: (state, action: PayloadAction<FetchQuantityDatums>) => {
      state.fetching = false;
      state.quantityDatums = action.payload.quantityDatums;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchQuantityDatums: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchLibraryTerminalsSuccessOrError.type)
        : state.apiError;
    },
    fetchSubProjectsSuccessOrError: (state, action: PayloadAction<FetchSubProjects>) => {
      state.fetching = false;
      state.subProjects = action.payload.subProjects;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchSubProjects: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchSubProjectsSuccessOrError.type)
        : state.apiError;
    },
  },
});

export const {
  fetchLibrary,
  fetchLibrarySuccessOrError,
  exportLibrary,
  exportLibrarySuccessOrError,
  importLibrary,
  importLibrarySuccessOrError,
  fetchLibraryTransportTypes,
  fetchLibraryTransportTypesSuccessOrError,
  fetchLibraryInterfaceTypes,
  fetchLibraryInterfaceTypesSuccessOrError,
  fetchLibraryTerminals,
  fetchLibraryTerminalsSuccessOrError,
  fetchLibraryAttributeTypes,
  fetchLibraryAttributeTypesSuccessOrError,
  addCollection,
  addToCollections,
  fetchQuantityDatums,
  fetchQuantityDatumsSuccessOrError,
  fetchSubProjectsSuccessOrError,
  fetchSubProjects,
} = librarySlice.actions;

export default librarySlice.reducer;
