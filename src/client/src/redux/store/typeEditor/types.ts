import {
  AttributeType,
  Dictionary,
  LibraryType,
  NodeType,
  Rds,
  TerminalType,
} from "../../../models/project";

export const FETCHING_INITIAL_DATA = "FETCHING_INITIAL_DATA";
export const FETCHING_INITIAL_SUCCESS_OR_ERROR =
  "FETCHING_INITIAL_SUCCESS_OR_ERROR";

export const CREATING_TYPE = "CREATING_TYPE";
export const CREATING_TYPE_SUCCESS_OR_ERROR = "CREATING_TYPE_SUCCESS_OR_ERROR";
export const FETCHING_TYPE = "FETCHING_TYPE";
export const FETCHING_TYPE_SUCCESS_OR_ERROR = "FETCHING_TYPE_SUCCESS_OR_ERROR";
export const SAVE_TYPE = "SAVE_TYPE";
export const SAVE_TYPE_SUCCESS_OR_ERROR = "SAVE_TYPE_SUCCESS_OR_ERROR";
export const FETCHING_ASPECTS = "FETCHING_ASPECTS";
export const FETCHING_ASPECTS_SUCCESS_OR_ERROR =
  "FETCHING_ASPECTS_SUCCESS_OR_ERROR";
export const FETCHING_OBJECTS = "FETCHING_OBJECTS";
export const FETCHING_OBJECTS_SUCCESS_OR_ERROR =
  "FETCHING_OBJECTS_SUCCESS_OR_ERROR";
export const FETCHING_STATUS = "FETCHING_STATUS";
export const FETCHING_STATUS_SUCCESS_OR_ERROR =
  "FETCHING_STATUS_SUCCESS_OR_ERROR";
export const FETCHING_RDS = "FETCHING_RDS";
export const FETCHING_RDS_SUCCESS_OR_ERROR = "FETCHING_RDS_SUCCESS_OR_ERROR";
export const FETCHING_TERMINALS = "FETCHING_TERMINALS";
export const FETCHING_TERMINALS_SUCCESS_OR_ERROR =
  "FETCHING_TERMINALS_SUCCESS_OR_ERROR";
export const FETCHING_ATTRIBUTES = "FETCHING_ATTRIBUTES";
export const FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR =
  "FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR";

// State types
export interface TypeEditorState {
  fetching: boolean;
  objectTypes: object;
  aspects: object;
  statuses: object;
  rdsList: Rds[];
  terminals: TerminalType[];
  attributes: AttributeType[];
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

interface CreatingTypeAction {
  type: typeof CREATING_TYPE;
  payload: object;
}

interface CreatingTypeActionActionFinished {
  type: typeof CREATING_TYPE_SUCCESS_OR_ERROR;
  payload: TypeEditorState;
}

interface FetchingTypeAction {
  type: typeof FETCHING_TYPE;
  payload: string;
}

interface FetchingTypeActionFinished {
  type: typeof FETCHING_TYPE_SUCCESS_OR_ERROR;
  payload: TypeEditorState;
}

interface SaveTypeAction {
  type: typeof SAVE_TYPE;
  payload: LibraryType;
}

interface SaveTypeActionFinished {
  type: typeof SAVE_TYPE_SUCCESS_OR_ERROR;
  payload: TypeEditorState;
}

interface FetchAspectsAction {
  type: typeof FETCHING_ASPECTS;
  payload: string;
}

interface FetchAspectsActionFinished {
  type: typeof FETCHING_ASPECTS_SUCCESS_OR_ERROR;
  payload: TypeEditorState;
}

interface FetchObjectsAction {
  type: typeof FETCHING_OBJECTS;
  payload: string;
}

interface FetchObjectsActionFinished {
  type: typeof FETCHING_OBJECTS_SUCCESS_OR_ERROR;
  payload: TypeEditorState;
}

export type TypeEditorActionTypes =
  | FetchingInitialDataAction
  | FetchingInitialDataActionFinished
  | CreatingTypeAction
  | CreatingTypeActionActionFinished
  | FetchingTypeAction
  | FetchingTypeActionFinished
  | SaveTypeAction
  | SaveTypeActionFinished
  | FetchAspectsAction
  | FetchAspectsActionFinished
  | FetchObjectsAction
  | FetchObjectsActionFinished;
