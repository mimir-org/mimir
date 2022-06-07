import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Collection, LibrarySubProjectItem } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface LibraryState {
  fetching: boolean;
  libNodes: NodeLibCm[] | null;
  apiError: ApiError[];
  // transportTypes: LibItem[];
  // interfaceTypes: LibItem[];
  subProjectTypes: LibrarySubProjectItem[];
  collections: Collection[];
}

// Action types
export interface FetchLibrary {
  libNodes: NodeLibCm[];
  // transportTypes: NodeLibCm[];
  // interfaceTypes: NodeLibCm[];
  subProjectTypes: LibrarySubProjectItem[];
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
