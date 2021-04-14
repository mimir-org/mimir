import { LibNode } from "../../../models/project";
export const FETCHING_LIBRARY = "FETCHING_LIBRARY";
export const FETCHING_LIBRARY_SUCCESS_OR_ERROR =
  "FETCHING_LIBRARY_SUCCESS_OR_ERROR";

// State types
export interface LibraryState {
  fetching: boolean;
  nodes: LibNode[] | null;
  hasError: boolean;
  errorMsg: string | null;
}

// Action types
interface FetchLibraryAction {
  type: typeof FETCHING_LIBRARY;
  payload: string;
}

interface FetchLibraryActionFinished {
  type: typeof FETCHING_LIBRARY_SUCCESS_OR_ERROR;
  payload: LibraryState;
}

export type LibraryActionTypes =
  | FetchLibraryAction
  | FetchLibraryActionFinished;
