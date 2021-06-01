import {
  CREATING_TYPE,
  CREATING_TYPE_SUCCESS_OR_ERROR,
  FETCHING_TYPE,
  FETCHING_TYPE_SUCCESS_OR_ERROR,
  SAVE_TYPE,
  SAVE_TYPE_SUCCESS_OR_ERROR,
  FETCHING_ASPECTS,
  FETCHING_ASPECTS_SUCCESS_OR_ERROR,
  FETCHING_OBJECTS,
  FETCHING_OBJECTS_SUCCESS_OR_ERROR,
  FETCHING_STATUS,
  FETCHING_STATUS_SUCCESS_OR_ERROR,
  FETCHING_RDS,
  FETCHING_RDS_SUCCESS_OR_ERROR,
  FETCHING_TERMINALS,
  FETCHING_TERMINALS_SUCCESS_OR_ERROR,
  FETCHING_ATTRIBUTES,
  FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
  FETCHING_INITIAL_DATA,
  FETCHING_INITIAL_SUCCESS_OR_ERROR,
  TypeEditorActionTypes,
  TypeEditorState,
} from "./types";

import { Dictionary } from "../../../models/project";

const initialState: TypeEditorState = {
  fetching: false,
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
    case FETCHING_INITIAL_DATA:
      return {
        ...state,
        fetching: true,
      };
    case FETCHING_INITIAL_SUCCESS_OR_ERROR:
      console.log(action.payload);
      return {
        ...state,
        fetching: false,
        aspects: action.payload.aspects,
        statuses: action.payload.statuses,
        objectTypes: action.payload.objectTypes,
      };
    case CREATING_TYPE:
      return {
        ...state,
        fetching: false,
      };

    case CREATING_TYPE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: action.payload.fetching,
      };
    case FETCHING_ASPECTS:
      return {
        ...state,
        fetching: true,
      };
    case FETCHING_ASPECTS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: action.payload.fetching,
      };
    case FETCHING_OBJECTS:
      return {
        ...state,
        fetching: true,
      };
    case FETCHING_OBJECTS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: action.payload.fetching,
      };

    default:
      return state;
  }
}
