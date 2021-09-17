import { Dictionary } from "../../../models/project";
import { ApiError } from "../../../models/webclient";
import {
  TypeMode,
  AttributeType,
  CreateLibraryType,
  Rds,
  TerminalType,
  TerminalTypeItem,
  Aspect,
  ObjectType,
  LocationType,
  PredefinedAttribute,
  BlobData,
  LibraryFilter,
} from "../../../models";

export const FETCHING_INITIAL_DATA = "FETCHING_INITIAL_DATA";
export const FETCHING_INITIAL_SUCCESS_OR_ERROR =
  "FETCHING_INITIAL_SUCCESS_OR_ERROR";
export const FETCHING_RDS = "FETCHING_RDS";
export const FETCHING_RDS_SUCCESS_OR_ERROR = "FETCHING_RDS_SUCCESS_OR_ERROR";
export const FETCHING_TERMINALS = "FETCHING_TERMINALS";
export const FETCHING_TERMINALS_SUCCESS_OR_ERROR =
  "FETCHING_TERMINALS_SUCCESS_OR_ERROR";
export const FETCHING_ATTRIBUTES = "export const FETCHING_ATTRIBUTES";
export const FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR =
  "FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR";
export const FETCHING_LOCATIONTYPES = "FETCHING_LOCATIONTYPES";
export const FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR =
  "FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR";
export const FETCHING_PREDEFINED_ATTRIBUTES = "FETCHING_PREDEFINED_ATTRIBUTES";
export const FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR =
  "FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR";
export const CLOSE_TYPE_EDITOR = "CLOSE_TYPE_EDITOR";
export const UPDATE_CREATELIBRARYTYPE = "UPDATE_CREATELIBRARYTYPE";
export const CHOOSE_ASPECT = "CHOOSE_ASPECT";
export const CHOOSE_OBJECT_TYPE = "CHOOSE_OBJECT_TYPE";
export const CHOOSE_TYPENAME = "CHOOSE_TYPENAME";
export const CHOOSE_SYMBOL = "CHOOSE_SYMBOL";
export const CHOOSE_RDS = "CHOOSE_RDS";
export const CHOOSE_RDS_NAME = "CHOOSE_RDS_NAME";
export const CHOOSE_TERMINAL_NAME = "CHOOSE_TERMINAL_NAME";
export const CHOOSE_TERMINAL_CATEGORY = "CHOOSE_TERMINAL_CATEGORY";
export const CHOOSE_TERMINAL_COLOR = "CHOOSE_TERMINAL_COLOR";
export const CHOOSE_SEMANTICREFERENCE = "CHOOSE_SEMANTICREFERENCE";
export const CHOOSE_LOCATION_TYPE = "CHOOSE_LOCATION_TYPE";
export const CHOOSE_TERMINAL_TYPE_ID = "CHOOSE_TERMINAL_TYPE_ID";
export const CHOOSE_PREDEFINED_ATTRIBUTES = "CHOOSE_PREDEFINED_ATTRIBUTES";
export const CHOOSE_TERMINALTYPE = "CHOOSE_TERMINALTYPE";
export const CHOOSE_ATTRIBUTETYPES = "CHOOSE_ATTRIBUTETYPES";
export const CHANGE_ASPECT = "CHANGE_ASPECT";
export const CHANGE_OBJECT_TYPE = "CHANGE_OBJECT_TYPE";
export const CHANGE_TYPENAME = "CHANGE_TYPENAME";
export const CHANGE_SYMBOL = "CHANGE_SYMBOL";
export const CHANGE_RDS = "CHANGE_RDS";
export const CHANGE_RDS_NAME = "CHANGE_RDS_NAME";
export const CHANGE_TERMINAL_CATEGORY = "CHANGE_TERMINAL_CATEGORY";
export const CHANGE_TERMINAL_COLOR = "CHANGE_TERMINAL_COLOR";
export const CHANGE_SEMANTICREFERENCE = "CHANGE_SEMANTICREFERENCE";
export const CHANGE_LOCATION_TYPE = "CHANGE_LOCATION_TYPE";
export const CHANGE_TERMINAL_TYPE_ID = "CHANGE_TERMINAL_TYPE_ID";
export const CHANGE_PREDEFINED_ATTRIBUTES = "CHANGE_PREDEFINED_ATTRIBUTES";
export const CHANGE_TERMINALTYPE = "CHANGE_TERMINALTYPE";
export const CHANGE_ATTRIBUTETYPES = "CHANGE_ATTRIBUTETYPES";
export const REMOVE_TERMINALTYPE = "REMOVE_TERMINALTYPE";
export const UPDATE_TERMINALTYPE = "UPDATE_TERMINALTYPE";
export const SAVE_LIBRARY_TYPE = "SAVE_LIBRARY_TYPE";
export const SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR =
  "SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR";
export const DELETE_TYPE_EDITOR_ERROR = "DELETE_TYPE_EDITOR_ERROR";
export const FETCHING_TYPE = "FETCHING_TYPE";
export const FETCHING_TYPE_SUCCESS_OR_ERROR = "FETCHING_TYPE_SUCCESS_OR_ERROR";
export const FETCHING_BLOB_DATA = "FETCHING_BLOB_DATA";
export const FETCHING_BLOB_DATA_SUCCESS_OR_ERROR =
  "FETCHING_BLOB_DATA_SUCCESS_OR_ERROR";
export const OPEN_TYPE_EDITOR = "OPEN_TYPE_EDITOR";

// State types
export interface TypeEditorState {
  visible: boolean;
  fetching: boolean;
  creating: boolean;
  createLibraryType: CreateLibraryType;
  aspects: object;
  objectTypes: object;
  rdsList: Rds[];
  terminals: TerminalType[];
  attributes: AttributeType[];
  mode: TypeMode;
  rdsName: string;
  terminalName: string;
  terminalCategory: string;
  terminalColor: string;
  locationTypes: LocationType[];
  predefinedAttributes: PredefinedAttribute[];
  apiError: ApiError[];
  icons: BlobData[];
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
    terminals: TerminalType[];
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

export interface CloseTypeEditor {
  type: typeof CLOSE_TYPE_EDITOR;
  payload: any;
}

export interface OpenTypeEditor {
  type: typeof OPEN_TYPE_EDITOR;
  payload: any;
}

export interface UpdateCreateLibraryType {
  type: typeof UPDATE_CREATELIBRARYTYPE;
  payload: {
    key: string;
    value: any;
  };
}

export interface ChooseObjectType {
  type: typeof CHOOSE_OBJECT_TYPE;
  payload: {
    objectType: ObjectType;
  };
}

export interface ChooseTypeName {
  type: typeof CHOOSE_TYPENAME;
  payload: {
    typeName: string;
  };
}

export interface ChooseSymbol {
  type: typeof CHOOSE_SYMBOL;
  payload: {
    symbolId: string;
  };
}
export interface ChooseRds {
  type: typeof CHOOSE_RDS;
  payload: {
    rds: string;
  };
}

export interface ChooseRdsName {
  type: typeof CHOOSE_RDS_NAME;
  payload: {
    rdsName: string;
  };
}

export interface ChooseTerminalName {
  type: typeof CHOOSE_TERMINAL_NAME;
  payload: {
    terminalName: string;
  };
}

export interface ChooseTerminalCategory {
  type: typeof CHOOSE_TERMINAL_CATEGORY;
  payload: {
    terminalCategory: string;
  };
}

export interface ChooseTerminalColor {
  type: typeof CHOOSE_TERMINAL_COLOR;
  payload: {
    terminalColor: string;
  };
}

export interface ChooseSemanticReference {
  type: typeof CHOOSE_SEMANTICREFERENCE;
  payload: {
    semanticReference: string;
  };
}
export interface ChooseLocationType {
  type: typeof CHOOSE_LOCATION_TYPE;
  payload: {
    locationType: string;
  };
}
export interface ChooseTerminalTypeId {
  type: typeof CHOOSE_TERMINAL_TYPE_ID;
  payload: {
    terminalTypeId: string;
  };
}
export interface ChoosePredefinedAttributes {
  type: typeof CHOOSE_PREDEFINED_ATTRIBUTES;
  payload: {
    predefinedAttributes: PredefinedAttribute[];
  };
}

export interface ChooseTerminalType {
  type: typeof CHOOSE_TERMINALTYPE;
  payload: {
    terminal: TerminalTypeItem;
  };
}

export interface ChooseAttributesTypes {
  type: typeof CHOOSE_ATTRIBUTETYPES;
  payload: {
    attributeTypes: string[];
  };
}

export interface ChangeAspect {
  type: typeof CHANGE_ASPECT;
  payload: {
    aspect: Aspect;
  };
}

export interface ChangeObjectType {
  type: typeof CHANGE_OBJECT_TYPE;
  payload: {
    objectType: ObjectType;
  };
}

export interface ChangeTypeName {
  type: typeof CHANGE_TYPENAME;
  payload: {
    typeName: string;
  };
}
export interface ChangeSymbol {
  type: typeof CHANGE_SYMBOL;
  payload: {
    symbolId: string;
  };
}
export interface ChangeRds {
  type: typeof CHANGE_RDS;
  payload: {
    rds: string;
  };
}
export interface ChangeRdsName {
  type: typeof CHANGE_RDS_NAME;
  payload: {
    rdsName: string;
  };
}
export interface ChangeTerminalCategory {
  type: typeof CHANGE_TERMINAL_CATEGORY;
  payload: {
    terminalCategory: string;
  };
}
export interface ChangeTerminalColor {
  type: typeof CHANGE_TERMINAL_COLOR;
  payload: {
    terminalColor: string;
  };
}
export interface ChangeSemanticReference {
  type: typeof CHANGE_SEMANTICREFERENCE;
  payload: {
    semanticReference: string;
  };
}
export interface ChangeLocationType {
  type: typeof CHANGE_LOCATION_TYPE;
  payload: {
    locationType: string;
  };
}
export interface ChangeTerminalTypeId {
  type: typeof CHANGE_TERMINAL_TYPE_ID;
  payload: {
    terminalTypeId: string;
  };
}
export interface ChangePredefinedAttributes {
  type: typeof CHANGE_PREDEFINED_ATTRIBUTES;
  payload: {
    predefinedAttributes: PredefinedAttribute[];
  };
}

export interface ChangeTerminalType {
  type: typeof CHANGE_TERMINALTYPE;
  payload: {
    terminal: TerminalTypeItem;
  };
}

export interface ChangeAttributesTypes {
  type: typeof CHANGE_ATTRIBUTETYPES;
  payload: {
    attributeTypes: string[];
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

interface SaveLibraryType {
  type: typeof SAVE_LIBRARY_TYPE;
  payload: {
    libraryType: CreateLibraryType;
  };
}
interface DeleteTypeEditorErrorAction {
  type: typeof DELETE_TYPE_EDITOR_ERROR;
  payload: {
    key: string;
  };
}
interface SaveLibraryTypeFinished {
  type: typeof SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR;
  payload: {
    apiError: ApiError;
  };
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
  | CloseTypeEditor
  | UpdateCreateLibraryType
  | ChooseObjectType
  | ChooseTypeName
  | ChooseSymbol
  | ChooseRds
  | ChooseRdsName
  | ChooseTerminalName
  | ChooseTerminalCategory
  | ChooseTerminalColor
  | ChooseSemanticReference
  | ChooseLocationType
  | ChooseTerminalTypeId
  | ChoosePredefinedAttributes
  | ChooseTerminalType
  | ChooseAttributesTypes
  | ChangeAspect
  | ChangeObjectType
  | ChangeTypeName
  | ChangeSymbol
  | ChangeRds
  | ChangeRdsName
  | ChangeTerminalCategory
  | ChangeTerminalColor
  | ChangeSemanticReference
  | ChangeLocationType
  | ChangeTerminalTypeId
  | ChangePredefinedAttributes
  | ChangeTerminalType
  | ChangeAttributesTypes
  | RemoveTerminalType
  | UpdateTerminalType
  | SaveLibraryType
  | SaveLibraryTypeFinished
  | DeleteTypeEditorErrorAction
  | OpenTypeEditor;
