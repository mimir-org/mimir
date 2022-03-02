import { Collection, LibItem, LibrarySubProjectItem } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface LibraryState {
  fetching: boolean;
  nodeTypes: LibItem[] | null;
  apiError: ApiError[];
  transportTypes: LibItem[];
  interfaceTypes: LibItem[];
  subProjectTypes: LibrarySubProjectItem[];
  collections: Collection[];
}

// Action types
export interface FetchLibrary {
  nodeTypes: LibItem[];
  transportTypes: LibItem[];
  interfaceTypes: LibItem[];
  subProjectTypes: LibrarySubProjectItem[];
  apiError: ApiError;
}

export interface FetchLibraryItems {
  libraryItems: LibItem[];
  apiError: ApiError;
}

export interface DeleteLibraryItem {
  id: string;
  apiError: ApiError;
}

export interface addToCollectionsTypes {
  types: LibItem[];
  collectionIds: string[];
}
