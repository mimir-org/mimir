import {
  AttributeType,
  CreateLibraryType,
  Rds,
  TerminalType,
  Aspect,
  ObjectType,
  Status,
} from "../../../models";
import { Dictionary } from "../../../models/project";

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
export const CREATING_TYPE = "CREATING_TYPE";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const CREATING_TYPE_SUCCESS_OR_ERROR = "CREATING_TYPE_SUCCESS_OR_ERROR";

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

export interface ChangeMode {
  type: typeof CHANGE_MODE;
  payload: {
    mode: string;
  };
}
interface CreatingTypeAction {
  type: typeof CREATING_TYPE;
  payload: object;
}

interface CreatingTypeActionFinished {
  type: typeof CREATING_TYPE_SUCCESS_OR_ERROR;
  payload: TypeEditorState;
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
  | ChangeMode
  | CreatingTypeAction
  | CreatingTypeActionFinished;
