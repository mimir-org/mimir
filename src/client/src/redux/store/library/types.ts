import { LibItem, CreateLibraryType, ObjectType } from "../../../models";
import { ApiError } from "../../../models/webclient";
export const FETCHING_LIBRARY = "FETCHING_LIBRARY";
export const DELETE_LIBRARY_ERROR = "DELETE_LIBRARY_ERROR";
export const FETCHING_LIBRARY_SUCCESS_OR_ERROR = "FETCHING_LIBRARY_SUCCESS_OR_ERROR";
export const EXPORT_LIBRARY = "EXPORT_LIBRARY";
export const EXPORT_LIBRARY_SUCCESS_OR_ERROR = "EXPORT_LIBRARY_SUCCESS_OR_ERROR";
export const IMPORT_LIBRARY = "IMPORT_LIBRARY";
export const IMPORT_LIBRARY_SUCCESS_OR_ERROR = "IMPORT_LIBRARY_SUCCESS_OR_ERROR";
export const FETCHING_LIBRARY_TRANSPORT_TYPES = "FETCHING_LIBRARY_TRANSPORT_TYPES";
export const FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR =
  "FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR";
export const FETCHING_LIBRARY_INTERFACE_TYPES = "FETCHING_LIBRARY_INTERFACE_TYPES";
export const FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR =
  "FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR";
export const REMOVE_LIBRARY_ITEM = "REMOVE_LIBRARY_ITEM";
export const ADD_LIBRARY_ITEM = "ADD_LIBRARY_ITEM";

// State types
export interface LibraryState {
  fetching: boolean;
  nodeTypes: LibItem[] | null;
  apiError: ApiError[];
  transportTypes: LibItem[];
  interfaceTypes: LibItem[];
}

// Action types
interface FetchLibraryAction {
  type: typeof FETCHING_LIBRARY;
  payload: string;
}
interface FetchLibraryActionFinished {
  type: typeof FETCHING_LIBRARY_SUCCESS_OR_ERROR;
  payload: {
    nodeTypes: LibItem[];
    transportTypes: LibItem[];
    interfaceTypes: LibItem[];
    apiError: ApiError;
  };
}
interface DeleteLibraryErrorAction {
  type: typeof DELETE_LIBRARY_ERROR;
  payload: {
    key: string;
  };
}
export interface ExportLibraryAction {
  type: typeof EXPORT_LIBRARY;
  payload: {
    fileName: string;
    apiError: ApiError;
  };
}
export interface ExportLibraryActionFinished {
  type: typeof EXPORT_LIBRARY_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}

export interface ImportLibraryAction {
  type: typeof IMPORT_LIBRARY;
  payload: {
    libraryTypes: CreateLibraryType[];
    apiError: ApiError;
  };
}
export interface ImportLibraryActionFinished {
  type: typeof IMPORT_LIBRARY_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}
export interface FetchingLibraryTransportActionTypes {
  type: typeof FETCHING_LIBRARY_TRANSPORT_TYPES;
  payload: null;
}
export interface FetchingLibraryTransportActionTypesFinished {
  type: typeof FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR;
  payload: {
    transports: LibItem[];
    apiError: ApiError;
  };
}

export interface FetchingLibraryInterfaceActionTypes {
  type: typeof FETCHING_LIBRARY_INTERFACE_TYPES;
  payload: null;
}
export interface FetchingLibraryInterfaceActionTypesFinished {
  type: typeof FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR;
  payload: {
    transports: LibItem[];
    apiError: ApiError;
  };
}
export interface RemoveLibraryItem {
  type: typeof REMOVE_LIBRARY_ITEM;
  payload: {
    id: string;
    objectType: ObjectType;
  };
}
export interface AddLibraryItem {
  type: typeof ADD_LIBRARY_ITEM;
  payload: LibItem;
}

export type LibraryActionTypes =
  | FetchLibraryAction
  | FetchLibraryActionFinished
  | DeleteLibraryErrorAction
  | ExportLibraryAction
  | ExportLibraryActionFinished
  | ImportLibraryAction
  | ImportLibraryActionFinished
  | FetchingLibraryTransportActionTypes
  | FetchingLibraryTransportActionTypesFinished
  | FetchingLibraryInterfaceActionTypes
  | FetchingLibraryInterfaceActionTypesFinished
  | RemoveLibraryItem
  | AddLibraryItem;
