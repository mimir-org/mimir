import {
  AttributeType,
  Dictionary,
  Rds,
  TerminalType,
} from "../../../models/project";

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
export const CREATING_TYPE = "CREATING_TYPE";
export const CREATING_TYPE_SUCCESS_OR_ERROR = "CREATING_TYPE_SUCCESS_OR_ERROR";

// State types
export interface TypeEditorState {
  fetching: boolean;
  objectTypes: object;
  aspects: object;
  statuses: object;
  rdsList: Rds[];
  terminals: TerminalType[];
  attributes: AttributeType[];
  aspect: string;
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
    aspect: string;
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
    aspect: string;
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
    aspect: string;
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
  | CreatingTypeAction
  | CreatingTypeActionFinished;
