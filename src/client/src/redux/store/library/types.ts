import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Collection } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface LibraryState {
  fetching: boolean;
  libNodes: NodeLibCm[] | null;
  apiError: ApiError[];
  collections: Collection[];
}

// Action types
export interface FetchLibrary {
  libNodes: NodeLibCm[];
  apiError: ApiError;
}

export interface FetchLibraryItems {
  libNodes: NodeLibCm[];
  apiError: ApiError;
}

export interface DeleteLibraryItem {
  id: string;
  apiError: ApiError;
}

export interface AddToCollectionsTypes {
  libNodes: NodeLibCm[];
  collectionIds: string[];
}
