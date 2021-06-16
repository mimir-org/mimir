import {
  FETCHING_RDS,
  FETCHING_RDS_SUCCESS_OR_ERROR,
  FETCHING_INITIAL_DATA,
  FETCHING_INITIAL_SUCCESS_OR_ERROR,
  FETCHING_TERMINALS,
  FETCHING_TERMINALS_SUCCESS_OR_ERROR,
  FETCHING_ATTRIBUTES,
  FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
  CHANGE_ASPECT,
  TypeEditorActionTypes,
  TypeEditorState,
} from "./types";

const initialState: TypeEditorState = {
  fetching: false,
  objectTypes: {},
  aspects: {},
  statuses: {},
  rdsList: [],
  terminals: [],
  attributes: [],
  aspect: "NotSet",
};

export function typeEditorReducer(
  state = initialState,
  action: TypeEditorActionTypes
): TypeEditorState {
  switch (action.type) {
    case FETCHING_INITIAL_DATA:
      return {
        ...state,
        fetching: true,
      };
    case FETCHING_INITIAL_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        aspects: action.payload.aspects,
        statuses: action.payload.statuses,
        objectTypes: action.payload.objectTypes,
      };
    case FETCHING_RDS:
      return {
        ...state,
        fetching: true,
      };
    case FETCHING_RDS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        rdsList: action.payload.Rds ? action.payload.Rds : [],
      };
    case FETCHING_TERMINALS:
      return {
        ...state,
        fetching: true,
      };
    case FETCHING_TERMINALS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        terminals: action.payload.terminals,
      };
    case FETCHING_ATTRIBUTES:
      return {
        ...state,
        fetching: true,
      };
    case FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        attributes: action.payload.AttributeType
          ? action.payload.AttributeType
          : [],
      };
    case CHANGE_ASPECT:
      return {
        ...state,
        aspect: action.payload.aspect,
      };
    default:
      return state;
  }
}
