import { LibrarySubProject } from "@mimirorg/modelbuilder-types";
import { NodeLibCm, QuantityDatumCm, TerminalLibCm, AttributeLibCm } from "@mimirorg/typelibrary-types";
import { Collection } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface LibraryState {
  fetching: boolean;
  libNodes: NodeLibCm[] | null;
  terminals: TerminalLibCm[] | null;
  apiError: ApiError[];
  collections: Collection[];
  quantityDatums: QuantityDatumCm[];
  attributeTypes: AttributeLibCm[];
  subProjects: LibrarySubProject[];
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
  apiError: ApiError;
}

export interface FetchTerminals {
  terminals: TerminalLibCm[];
  apiError: ApiError;
}

export interface FetchAttributes {
  attributeTypes: AttributeLibCm[];
  apiError: ApiError;
}

export interface FetchInterfaceTypes {
  apiError: ApiError;
}

export interface AddToCollectionsTypes {
  libNodes: NodeLibCm[];
  collectionIds: string[];
}

export interface FetchQuantityDatums {
  quantityDatums: QuantityDatumCm[];
  apiError: ApiError;
}

export interface FetchSubProjects {
  subProjects: LibrarySubProject[];
  apiError: ApiError;
}
