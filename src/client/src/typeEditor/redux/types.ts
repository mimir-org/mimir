import { Dictionary } from "../../models/project";
import { ApiError } from "../../models/webclient";
import {
  AttributeType,
  CreateLibraryType,
  Rds,
  TerminalTypeItem,
  Aspect,
  Purpose,
  LocationType,
  PredefinedAttribute,
  BlobData,
  LibraryFilter,
  SimpleType,
  TerminalTypeDict,
} from "../../models";

export const FETCHING_INITIAL_DATA = "FETCHING_INITIAL_DATA";
export const FETCHING_INITIAL_SUCCESS_OR_ERROR = "FETCHING_INITIAL_SUCCESS_OR_ERROR";
export const FETCHING_RDS = "FETCHING_RDS";
export const FETCHING_RDS_SUCCESS_OR_ERROR = "FETCHING_RDS_SUCCESS_OR_ERROR";
export const FETCHING_TERMINALS = "FETCHING_TERMINALS";
export const FETCHING_TERMINALS_SUCCESS_OR_ERROR = "FETCHING_TERMINALS_SUCCESS_OR_ERROR";
export const FETCHING_ATTRIBUTES = "export const FETCHING_ATTRIBUTES";
export const FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR = "FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR";
export const FETCHING_LOCATIONTYPES = "FETCHING_LOCATIONTYPES";
export const FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR = "FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR";
export const FETCHING_PREDEFINED_ATTRIBUTES = "FETCHING_PREDEFINED_ATTRIBUTES";
export const FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR = "FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR";
export const FETCHING_BLOB_DATA = "FETCHING_BLOB_DATA";
export const FETCHING_BLOB_DATA_SUCCESS_OR_ERROR = "FETCHING_BLOB_DATA_SUCCESS_OR_ERROR";
export const FETCHING_SIMPLE_TYPES = "FETCHING_SIMPLE_TYPES";
export const FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR = "FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR";
export const FETCHING_TYPE = "FETCHING_TYPE";
export const FETCHING_TYPE_SUCCESS_OR_ERROR = "FETCHING_TYPE_SUCCESS_OR_ERROR";
export const OPEN_TYPE_EDITOR = "OPEN_TYPE_EDITOR";
export const CLOSE_TYPE_EDITOR = "CLOSE_TYPE_EDITOR";
export const UPDATE_CREATELIBRARYTYPE = "UPDATE_CREATELIBRARYTYPE";
export const ADD_TERMINALTYPE = "ADD_TERMINALTYPE";
export const REMOVE_TERMINALTYPE = "REMOVE_TERMINALTYPE";
export const UPDATE_TERMINALTYPE = "UPDATE_TERMINALTYPE";
export const REMOVE_TERMINALTYPE_BY_CATEGORY = "REMOVE_TERMINALTYPE_BY_CATEGORY";
export const CLEAR_ALL_TERMINALTYPES = "CLEAR_ALL_TERMINALTYPES";
export const SAVE_LIBRARY_TYPE = "SAVE_LIBRARY_TYPE";
export const SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR = "SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR";
export const DELETE_TYPE_EDITOR_ERROR = "DELETE_TYPE_EDITOR_ERROR";
export const CHANGE_TYPE_EDITOR_INSPECTOR_HEIGHT = "CHANGE_TYPE_EDITOR_INSPECTOR_HEIGHT";
export const CHANGE_TYPE_EDITOR_INSPECTOR_VISIBILITY = "CHANGE_TYPE_EDITOR_INSPECTOR_VISIBILITY";
export const CHANGE_TYPE_EDITOR_INSPECTOR_TAB = "CHANGE_TYPE_EDITOR_INSPECTOR_TAB";
export const CHANGE_TYPE_EDITOR_VALIDATION_VISIBILITY = "CHANGE_TYPE_EDITOR_VALIDATION_VISIBILITY";

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
interface FetchingInitialDataAction {
  type: typeof FETCHING_INITIAL_DATA;
  payload: null;
}

interface FetchingInitialDataActionFinished {
  type: typeof FETCHING_INITIAL_SUCCESS_OR_ERROR;
  payload: {
    aspects: Dictionary[];
    objectTypes: Dictionary[];
    purposes: Purpose[];
  };
}

interface FetchingRDSAction {
  type: typeof FETCHING_RDS;
  payload: {
    aspect: Aspect;
  };
}

interface FetchingRDSActionFinished {
  type: typeof FETCHING_RDS_SUCCESS_OR_ERROR;
  payload: {
    Rds: Rds[];
  };
}

interface FetchingTerminalsAction {
  type: typeof FETCHING_TERMINALS;
  payload: null;
}

interface FetchingTerminalsActionFinished {
  type: typeof FETCHING_TERMINALS_SUCCESS_OR_ERROR;
  payload: {
    terminals: TerminalTypeDict;
  };
}

interface FetchingAttributesAction {
  type: typeof FETCHING_ATTRIBUTES;
  payload: {
    aspect: Aspect;
  };
}

interface FetchingAttributesActionFinished {
  type: typeof FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR;
  payload: {
    AttributeType: AttributeType[];
  };
}

interface FetchingLocationTypesAction {
  type: typeof FETCHING_LOCATIONTYPES;
  payload: null;
}

interface FetchingLocationTypesActionFinished {
  type: typeof FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR;
  payload: {
    locationTypes: LocationType[];
  };
}

interface FetchingPredefinedAttributesAction {
  type: typeof FETCHING_PREDEFINED_ATTRIBUTES;
  payload: null;
}

interface FetchingPredefinedAttributesActionFinished {
  type: typeof FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR;
  payload: {
    predefinedAttributes: PredefinedAttribute[];
  };
}
interface FetchingTypeAction {
  type: typeof FETCHING_TYPE;
  payload: {
    selectedType: string;
    filter: LibraryFilter;
  };
}
interface FetchingTypeActionFinished {
  type: typeof FETCHING_TYPE_SUCCESS_OR_ERROR;
  payload: {
    selectedNode: CreateLibraryType;
  };
}

export interface FetchingBlobDataAction {
  type: typeof FETCHING_BLOB_DATA;
  payload: null;
}

export interface FetchingBlobDataActionFinished {
  type: typeof FETCHING_BLOB_DATA_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
    icons: BlobData[];
  };
}

export interface FetchingSimpleTypesAction {
  type: typeof FETCHING_SIMPLE_TYPES;
  payload: null;
}

export interface FetchingSimpleTypesActionFinished {
  type: typeof FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
    simpleTypes: SimpleType[];
  };
}
export interface OpenTypeEditor {
  type: typeof OPEN_TYPE_EDITOR;
  payload: any;
}
export interface CloseTypeEditor {
  type: typeof CLOSE_TYPE_EDITOR;
  payload: any;
}

export interface UpdateCreateLibraryType {
  type: typeof UPDATE_CREATELIBRARYTYPE;
  payload: {
    key: string;
    value: any;
  };
}

export interface AddTerminalType {
  type: typeof ADD_TERMINALTYPE;
  payload: {
    terminal: TerminalTypeItem;
  };
}

export interface RemoveTerminalType {
  type: typeof REMOVE_TERMINALTYPE;
  payload: { terminal: TerminalTypeItem };
}

export interface UpdateTerminalType {
  type: typeof UPDATE_TERMINALTYPE;
  payload: { terminal: TerminalTypeItem };
}

export interface RemoveTerminalTypeByCategory {
  type: typeof REMOVE_TERMINALTYPE_BY_CATEGORY;
  payload: { categoryId: string };
}

export interface ClearAllTerminalTypes {
  type: typeof CLEAR_ALL_TERMINALTYPES;
  payload: {};
}

interface SaveLibraryType {
  type: typeof SAVE_LIBRARY_TYPE;
  payload: {
    libraryType: CreateLibraryType;
  };
}

interface SaveLibraryTypeFinished {
  type: typeof SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
}
interface DeleteTypeEditorErrorAction {
  type: typeof DELETE_TYPE_EDITOR_ERROR;
  payload: {
    key: string;
  };
}

interface ChangeTypeEditorInspectorHeight {
  type: typeof CHANGE_TYPE_EDITOR_INSPECTOR_HEIGHT;
  payload: {
    height: number;
  };
}

interface ChangeTypeEditorInspectorVisibility {
  type: typeof CHANGE_TYPE_EDITOR_INSPECTOR_VISIBILITY;
  payload: {
    visibility: boolean;
  };
}

interface ChangeTypeEditorInspectorTab {
  type: typeof CHANGE_TYPE_EDITOR_INSPECTOR_TAB;
  payload: {
    index: number;
  };
}

interface ChangeTypeEditorValidationVisibility {
  type: typeof CHANGE_TYPE_EDITOR_VALIDATION_VISIBILITY;
  payload: {
    visibility: boolean;
  }
}

export type TypeEditorActionTypes =
  | FetchingInitialDataAction
  | FetchingInitialDataActionFinished
  | FetchingRDSAction
  | FetchingRDSActionFinished
  | FetchingTerminalsAction
  | FetchingTerminalsActionFinished
  | FetchingAttributesAction
  | FetchingAttributesActionFinished
  | FetchingLocationTypesAction
  | FetchingLocationTypesActionFinished
  | FetchingPredefinedAttributesAction
  | FetchingPredefinedAttributesActionFinished
  | FetchingTypeAction
  | FetchingTypeActionFinished
  | FetchingBlobDataAction
  | FetchingBlobDataActionFinished
  | FetchingSimpleTypesAction
  | FetchingSimpleTypesActionFinished
  | OpenTypeEditor
  | CloseTypeEditor
  | UpdateCreateLibraryType
  | AddTerminalType
  | RemoveTerminalType
  | UpdateTerminalType
  | ClearAllTerminalTypes
  | RemoveTerminalTypeByCategory
  | SaveLibraryType
  | SaveLibraryTypeFinished
  | DeleteTypeEditorErrorAction
  | ChangeTypeEditorInspectorHeight
  | ChangeTypeEditorInspectorVisibility
  | ChangeTypeEditorInspectorTab
  | ChangeTypeEditorValidationVisibility;
