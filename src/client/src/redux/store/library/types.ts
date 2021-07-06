import { LibraryNodeItem, CreateLibraryType } from "../../../models";
import { ApiError } from "../../../models/webclient";
export const FETCHING_LIBRARY = "FETCHING_LIBRARY";
export const DELETE_LIBRARY_ERROR = "DELETE_LIBRARY_ERROR";
export const FETCHING_LIBRARY_SUCCESS_OR_ERROR = "FETCHING_LIBRARY_SUCCESS_OR_ERROR";
export const EXPORT_LIBRARY = "EXPORT_LIBRARY";
export const EXPORT_LIBRARY_SUCCESS_OR_ERROR = "EXPORT_LIBRARY_SUCCESS_OR_ERROR";
export const IMPORT_LIBRARY = "IMPORT_LIBRARY";
export const IMPORT_LIBRARY_SUCCESS_OR_ERROR = "IMPORT_LIBRARY_SUCCESS_OR_ERROR";

// State types
export interface LibraryState {
    fetching: boolean;
    nodes: LibraryNodeItem[] | null;
    apiError: ApiError[];
}

// Action types
interface FetchLibraryAction {
    type: typeof FETCHING_LIBRARY;
    payload: string;
}

interface FetchLibraryActionFinished {
    type: typeof FETCHING_LIBRARY_SUCCESS_OR_ERROR;
    payload: {
        nodes: LibraryNodeItem[];
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

export type LibraryActionTypes =
    | FetchLibraryAction
    | FetchLibraryActionFinished
    | DeleteLibraryErrorAction
    | ExportLibraryAction
    | ExportLibraryActionFinished
    | ImportLibraryAction
    | ImportLibraryActionFinished;
