import { Terminal } from "@mimirorg/modelbuilder-types";
import { InterfaceLibCm, NodeLibCm, TransportLibCm } from "@mimirorg/typelibrary-types";
import { Collection } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface LibraryState {
  fetching: boolean;
  libNodes: NodeLibCm[] | null;
  transportTypes: TransportLibCm[] | null;
  interfaceTypes: InterfaceLibCm[] | null;
  terminals: Terminal[] | null;
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

export interface FetchTransportTypes {
  transportTypes: TransportLibCm[];
  apiError: ApiError;
}

export interface FetchTerminals {
  terminals: Terminal[];
  apiError: ApiError;
}

export interface FetchInterfaceTypes {
  interfaceTypes: InterfaceLibCm[];
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
