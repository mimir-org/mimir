import { LibraryNodeItem } from "../../../models";
import { ApiError } from "../../../models/webclient";
export const FETCHING_LIBRARY = "FETCHING_LIBRARY";
export const DELETE_LIBRARY_ERROR = "DELETE_LIBRARY_ERROR";
export const FETCHING_LIBRARY_SUCCESS_OR_ERROR =
  "FETCHING_LIBRARY_SUCCESS_OR_ERROR";

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

export type LibraryActionTypes =
  | FetchLibraryAction
  | FetchLibraryActionFinished
  | DeleteLibraryErrorAction;
