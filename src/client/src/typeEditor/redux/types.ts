import { ApiError } from "../../models/webclient";
import {
  AttributeType,
  CreateLibraryType,
  Rds,
  Purpose,
  LocationType,
  PredefinedAttribute,
  BlobData,
  LibraryFilter,
  SimpleType,
  TerminalTypeDict,
} from "../../models";

// State types
export interface TypeEditorState {
  visible: boolean;
  fetching: boolean;
  creating: boolean;
  validationVisibility: boolean;
  createLibraryType: CreateLibraryType;
  purposes: Purpose[];
  rdsList: Rds[];
  terminals: TerminalTypeDict;
  attributes: AttributeType[];
  locationTypes: LocationType[];
  predefinedAttributes: PredefinedAttribute[];
  simpleTypes: SimpleType[];
  apiError: ApiError[];
  icons: BlobData[];
  inspector: {
    visibility: boolean;
    height: number;
    activeTabIndex: number;
  };
}

// Action types
export interface FetchingTypeAction {
  selectedType: string;
  filter: LibraryFilter;
}

export interface FetchingBlobDataActionFinished {
  icons: BlobData[];
  apiError: ApiError;
}

export interface FetchingSimpleTypesActionFinished {
  simpleTypes: SimpleType[];
  apiError: ApiError;
}

export interface UpdateCreateLibraryType {
  key: string;
  value: any;
}