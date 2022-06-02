import { Collection } from "../../../models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddToCollectionsTypes, DeleteLibraryItem, FetchLibrary, FetchLibraryItems, LibraryState } from "./types";
import { ApiError } from "../../../models/webclient";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

const initialLibraryState: LibraryState = {
  fetching: false,
  nodeTypes: [],
  apiError: [],
  // transportTypes: [],
  // interfaceTypes: [],
  subProjectTypes: [],
  collections: [],
};

export const librarySlice = createSlice({
  name: "library",
  initialState: initialLibraryState,
  reducers: {
    fetchLibrary: (state) => {
      state.fetching = true;
      state.nodeTypes = [];
      // state.transportTypes = [];
      // state.interfaceTypes = [];
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchLibrarySuccessOrError.type)
        : state.apiError;
    },
    fetchLibrarySuccessOrError: (state, action: PayloadAction<FetchLibrary>) => {
      state.fetching = false;
      const { nodeTypes, subProjectTypes } = action.payload;
      Object.assign(state, { nodeTypes, subProjectTypes });
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
    fetchLibraryTransportTypesSuccessOrError: (state, action: PayloadAction<FetchLibraryItems>) => {
      state.fetching = false;
      // state.transportTypes = action.payload.libraryItems;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    fetchLibraryInterfaceTypes: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchLibraryInterfaceTypesSuccessOrError.type)
        : state.apiError;
    },
    fetchLibraryInterfaceTypesSuccessOrError: (state, action: PayloadAction<FetchLibraryItems>) => {
      state.fetching = false;
      // state.transportTypes = action.payload.libraryItems;
      action.payload.apiError && state.apiError.push(action.payload.apiError);
    },
    addLibraryItem: (state, action: PayloadAction<NodeLibCm>) => {
      // action.payload.libraryType === ObjectType.Interface && state.interfaceTypes.push(action.payload);
      // action.payload.libraryType === ObjectType.ObjectBlock && state.nodeTypes.push(action.payload);
      // action.payload.libraryType === ObjectType.Transport && state.transportTypes.push(action.payload);
      state.nodeTypes.push(action.payload);
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
        // state.interfaceTypes = state.interfaceTypes.filter((x) => x.id !== id);
        state.nodeTypes = state.nodeTypes.filter((x) => x.id !== id);
        // state.transportTypes = state.transportTypes.filter((x) => x.id !== id);
      }
    },
    removeLibraryItem: (state, action: PayloadAction<string>) => {
      // state.interfaceTypes = state.interfaceTypes.filter((x) => x.id !== action.payload);
      state.nodeTypes = state.nodeTypes.filter((x) => x.id !== action.payload);
      // state.transportTypes = state.transportTypes.filter((x) => x.id !== action.payload);
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
          action.payload.types.forEach((type) => {
            return !collection.libNodes.includes(type) ? collection.libNodes.push(type) : null;
          });
        }
        return collection;
      });
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
  addLibraryItem,
  removeLibraryItem,
  deleteLibraryError,
  deleteLibraryItem,
  deleteLibraryItemSuccessOrError,
  addCollection,
  addToCollections,
} = librarySlice.actions;

export default librarySlice.reducer;
