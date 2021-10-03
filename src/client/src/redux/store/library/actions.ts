import * as Types from "./types";
import { CreateLibraryType } from "../../../models";

export function searchLibrary(searchString: string): Types.LibraryActionTypes {
  return {
    type: Types.FETCHING_LIBRARY,
    payload: searchString,
  };
}

export function deleteLibraryError(key: string) {
  return {
    type: Types.DELETE_LIBRARY_ERROR,
    payload: {
      key,
    },
  };
}

export function exportLibrary(fileName: string): Types.LibraryActionTypes {
  return {
    type: Types.EXPORT_LIBRARY,
    payload: {
      fileName: fileName,
      apiError: null,
    },
  };
}

export function importLibrary(libraryTypes: CreateLibraryType[]): Types.LibraryActionTypes {
  return {
    type: Types.IMPORT_LIBRARY,
    payload: {
      libraryTypes: libraryTypes,
      apiError: null,
    },
  };
}

export function importLibraryTransportTypes(): Types.LibraryActionTypes {
  return {
    type: Types.FETCHING_LIBRARY_TRANSPORT_TYPES,
    payload: null,
  };
}

export function importLibraryInterfaceTypes(): Types.LibraryActionTypes {
  return {
    type: Types.FETCHING_LIBRARY_INTERFACE_TYPES,
    payload: null,
  };
}
