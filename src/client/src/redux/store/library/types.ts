import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Collection, LibrarySubProjectItem } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface LibraryState {
  fetching: boolean;
  nodeTypes: NodeLibCm[] | null;
  apiError: ApiError[];
  // transportTypes: LibItem[];
  // interfaceTypes: LibItem[];
  subProjectTypes: LibrarySubProjectItem[];
  collections: Collection[];
}

// Action types
export interface FetchLibrary {
  nodeTypes: NodeLibCm[];
  // transportTypes: NodeLibCm[];
  // interfaceTypes: NodeLibCm[];
  subProjectTypes: LibrarySubProjectItem[];
  apiError: ApiError;
}

export interface FetchLibraryItems {
  libraryItems: NodeLibCm[];
  apiError: ApiError;
}

export interface DeleteLibraryItem {
  id: string;
  apiError: ApiError;
}

export interface addToCollectionsTypes {
  types: NodeLibCm[];
  collectionIds: string[];
}
