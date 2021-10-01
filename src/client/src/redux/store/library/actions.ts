import { CreateLibraryType } from "../../../models";
import {
  FETCHING_LIBRARY,
  DELETE_LIBRARY_ERROR,
  EXPORT_LIBRARY,
  IMPORT_LIBRARY,
  FETCHING_LIBRARY_TRANSPORT_TYPES,
  LibraryActionTypes,
  FETCHING_LIBRARY_INTERFACE_TYPES,
} from "./types";

export function searchLibrary(searchString: string): LibraryActionTypes {
  return {
    type: FETCHING_LIBRARY,
    payload: searchString,
  };
}

export function deleteLibraryError(key: string) {
  return {
    type: DELETE_LIBRARY_ERROR,
    payload: {
      key,
    },
  };
}

export function exportLibrary(fileName: string): LibraryActionTypes {
  return {
    type: EXPORT_LIBRARY,
    payload: {
      fileName: fileName,
      apiError: null,
    },
  };
}

export function importLibrary(libraryTypes: CreateLibraryType[]): LibraryActionTypes {
  return {
    type: IMPORT_LIBRARY,
    payload: {
      libraryTypes: libraryTypes,
      apiError: null,
    },
  };
}

export function importLibraryTransportTypes(): LibraryActionTypes {
  return {
    type: FETCHING_LIBRARY_TRANSPORT_TYPES,
    payload: null,
  };
}

export function importLibraryInterfaceTypes(): LibraryActionTypes {
  return {
    type: FETCHING_LIBRARY_INTERFACE_TYPES,
    payload: null,
  };
}
