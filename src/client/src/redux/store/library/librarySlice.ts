import { Collection } from "../../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../../../models/webclient";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import {
  AddToCollectionsTypes,
  DeleteLibraryItem,
  FetchInterfaceTypes,
  FetchLibrary,
  FetchQuantityDatums,
  FetchTerminals,
  FetchTransportTypes,
  LibraryState,
} from "./types";

const initialLibraryState: LibraryState = {
  fetching: false,
  libNodes: [],
  apiError: [],
  collections: [],
  transportTypes: [],
  interfaceTypes: [],
  terminals: [],
  quantityDatums: [],
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
    addLibraryItem: (state, action: PayloadAction<NodeLibCm>) => {
      // TODO: fix
      // action.payload.libraryType === ObjectType.Interface && state.interfaceTypes.push(action.payload);
      // action.payload.libraryType === ObjectType.ObjectBlock && state.nodeTypes.push(action.payload);
      // action.payload.libraryType === ObjectType.Transport && state.transportTypes.push(action.payload);
      state.libNodes.push(action.payload);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteLibraryItem: (state, action: PayloadAction<string>) => {
      return state;
    },
    deleteLibraryItemSuccessOrError: (state, action: PayloadAction<DeleteLibraryItem>) => {
      const { id, apiError } = action.payload;
      if (apiError) {
        state.apiError.push(apiError);
      } else {
        state.interfaceTypes = state.interfaceTypes.filter((x) => x.id !== id);
        state.libNodes = state.libNodes.filter((x) => x.id !== id);
        state.transportTypes = state.transportTypes.filter((x) => x.id !== id);
      }
    },
    removeLibraryItem: (state, action: PayloadAction<string>) => {
      state.interfaceTypes = state.interfaceTypes.filter((x) => x.id !== action.payload);
      state.libNodes = state.libNodes.filter((x) => x.id !== action.payload);
      state.transportTypes = state.transportTypes.filter((x) => x.id !== action.payload);
    },
    deleteLibraryError: (state, action: PayloadAction<string>) => {
      state.apiError = state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload) : state.apiError;
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
  addLibraryItem,
  removeLibraryItem,
  deleteLibraryError,
  deleteLibraryItem,
  deleteLibraryItemSuccessOrError,
  addCollection,
  addToCollections,
  fetchQuantityDatums,
  fetchQuantityDatumsSuccessOrError,
} = librarySlice.actions;

export default librarySlice.reducer;
