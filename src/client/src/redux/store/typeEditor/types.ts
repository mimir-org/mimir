import {
  AttributeType,
  CreateLibraryType,
  Rds,
  TerminalType,
  TerminalTypeItem,
  Aspect,
  ObjectType,
  Status,
} from "../../../models";
import { Dictionary } from "../../../models/project";
import { ApiError } from "../../../models/webclient";

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
export const CHANGE_ASPECT = "CHANGE_ASPECT";
export const CHANGE_OBJECTTYPE = "CHANGE_OBJECTTYPE";
export const CHANGE_TYPENAME = "CHANGE_TYPENAME";
export const CHANGE_MODE = "CHANGE_MODE";
export const CHANGE_SELECTED_TYPE = "CHANGE_SELECTED_TYPE";
export const CHANGE_RDS_NAME = "CHANGE_RDS_NAME";
export const CHANGE_TERMINAL_CATEGORY = "CHANGE_TERMINAL_CATEGORY";
export const CHANGE_TERMINAL_COLOR = "CHANGE_TERMINAL_COLOR";
export const CREATING_TYPE = "CREATING_TYPE";
export const UPDATING_TYPE = "UPDATING_TYPE";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const CHANGE_RDS = "CHANGE_RDS";
export const CHANGE_SEMANTICREFERENCE = "CHANGE_SEMANTICREFERENCE";
export const CHANGE_TERMINAL_TYPE_ID = "CHANGE_TERMINAL_TYPE_ID";
export const UPDATE_TERMINALTYPES = "UPDATE_TERMINALTYPES";
export const UPDATE_ATTRIBUTETYPES = "UPDATE_ATTRIBUTETYPES";
export const CREATING_TYPE_SUCCESS_OR_ERROR = "CREATING_TYPE_SUCCESS_OR_ERROR";
export const UPDATE_TYPE_SUCCESS_OR_ERROR = "UPDATE_TYPE_SUCCESS_OR_ERROR";
export const DELETE_TYPE_EDITOR_ERROR = "DELETE_TYPE_EDITOR_ERROR";

// State types
export interface TypeEditorState {
  fetching: boolean;
  creating: boolean;
  createLibraryType: CreateLibraryType;
  aspects: object;
  objectTypes: object;
  statuses: object;
  rdsList: Rds[];
  terminals: TerminalType[];
  attributes: AttributeType[];
  mode: string;
  rdsName: string;
  terminalCategory: string;
  terminalColor: string;
  apiError: ApiError[];
  selectedType: string;
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
    statuses: Dictionary[];
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

export interface ChangeSelectedAspect {
  type: typeof CHANGE_ASPECT;
  payload: {
    aspect: Aspect;
  };
}

export interface ChangeObjectType {
  type: typeof CHANGE_OBJECTTYPE;
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

export interface ChangeStatus {
  type: typeof CHANGE_STATUS;
  payload: {
    status: Status;
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

export interface ChangeTerminalTypeId {
  type: typeof CHANGE_TERMINAL_TYPE_ID;
  payload: {
    terminalTypeId: string;
  };
}

export interface ChangeSemanticReference {
  type: typeof CHANGE_SEMANTICREFERENCE;
  payload: {
    semanticReference: string;
  };
}

export interface UpdateTerminalTypes {
  type: typeof UPDATE_TERMINALTYPES;
  payload: {
    terminalTypes: TerminalTypeItem[];
  };
}

export interface UpdateAttributesTypes {
  type: typeof UPDATE_ATTRIBUTETYPES;
  payload: {
    attributeTypes: string[];
  };
}

export interface ChangeMode {
  type: typeof CHANGE_MODE;
  payload: {
    mode: string;
  };
}
interface CreatingTypeAction {
  type: typeof CREATING_TYPE;
  payload: {
    libraryType: CreateLibraryType;
  };
}
interface UpdatingTypeAction {
  type: typeof UPDATING_TYPE;
  payload: {
    libraryType: CreateLibraryType;
  };
}

interface CreatingTypeActionFinished {
  type: typeof CREATING_TYPE_SUCCESS_OR_ERROR;
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

export type TypeEditorActionTypes =
  | FetchingInitialDataAction
  | FetchingInitialDataActionFinished
  | FetchingRDSAction
  | FetchingRDSActionFinished
  | FetchingTerminalsAction
  | FetchingTerminalsActionFinished
  | FetchingAttributesAction
  | FetchingAttributesActionFinished
  | ChangeSelectedAspect
  | ChangeObjectType
  | ChangeTypeName
  | ChangeStatus
  | ChangeRds
  | ChangeRdsName
  | ChangeTerminalCategory
  | ChangeTerminalColor
  | ChangeTerminalTypeId
  | ChangeSemanticReference
  | UpdateTerminalTypes
  | UpdateAttributesTypes
  | ChangeMode
  | UpdatingTypeAction
  | CreatingTypeAction
  | CreatingTypeActionFinished
  | DeleteTypeEditorErrorAction;
