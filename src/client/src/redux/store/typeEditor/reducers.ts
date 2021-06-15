import {
  CREATING_TYPE,
  CREATING_TYPE_SUCCESS_OR_ERROR,
  FETCHING_RDS,
  FETCHING_RDS_SUCCESS_OR_ERROR,
  FETCHING_INITIAL_DATA,
  FETCHING_INITIAL_SUCCESS_OR_ERROR,
  FETCHING_TERMINALS,
  FETCHING_TERMINALS_SUCCESS_OR_ERROR,
  FETCHING_ATTRIBUTES,
  FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
  CHANGE_ASPECT,
  CHANGE_OBJECTTYPE,
  CHANGE_TYPENAME,
  CHANGE_MODE,
  CHANGE_STATUS,
  TypeEditorActionTypes,
  TypeEditorState,
} from "./types";

const initialState: TypeEditorState = {
  fetching: false,
  creating: false,
  mode: "NotSet",
  type: null,
  aspect: "NotSet",
  objectType: "NotSet",
  typeName: "",
  status: "Draft",
  objectTypes: {},
  aspects: {},
  statuses: {},
  rdsList: [],
  terminals: [],
  attributes: [],
};

export function typeEditorReducer(
  state = initialState,
  action: TypeEditorActionTypes
): TypeEditorState {
  switch (action.type) {
    case CREATING_TYPE:
      return {
        ...state,
        fetching: false,
        creating: true,
      };
    case CREATING_TYPE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        type: action.payload.type ?? state.type,
      };
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
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    case CHANGE_ASPECT:
      return {
        ...state,
        aspect: action.payload.aspect,
      };
    case CHANGE_OBJECTTYPE:
      return {
        ...state,
        objectType: action.payload.objectType,
      };
    case CHANGE_TYPENAME:
      return {
        ...state,
        typeName: action.payload.typeName,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };

    default:
      return state;
  }
}
