import * as Types from "./types";
import { CombinedAttributeFilter, ModuleDescription } from "../../../models";

const initialState: Types.CommonState = {
  fetching: false,
  collaborationPartners: [],
  parsers: [] as ModuleDescription[],
  filters: [] as CombinedAttributeFilter[],
  statuses: [],
  apiError: [],
};

export function commonReducer(state = initialState, action: Types.CommonActionTypes) {
  switch (action.type) {
    case Types.FETCHING_COLLABORATION_PARTNERS:
      return {
        ...state,
        fetching: true,
        collaborationPartners: [],
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_COLLABORATION_PARTNERS)
          : state.apiError,
      };

    case Types.FETCHING_COLLABORATION_PARTNERS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        collaborationPartners: action.payload.collaborationPartners,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.FETCHING_STATUSES:
      return {
        ...state,
        fetching: true,
        statuses: [],
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_STATUSES)
          : state.apiError,
      };

    case Types.FETCHING_STATUSES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        statuses: action.payload.statuses,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.DELETE_COMMON_ERROR:
      return {
        ...state,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError,
      };

    case Types.FETCHING_COMBINED_ATTRIBUTE_FILTERS:
      return {
        ...state,
        fetching: true,
        filters: [] as CombinedAttributeFilter[],
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_COMBINED_ATTRIBUTE_FILTERS)
          : state.apiError,
      };

    case Types.FETCHING_COMBINED_ATTRIBUTE_FILTERS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        filters: action.payload.filters,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.FETCHING_PARSERS:
      return {
        ...state,
        fetching: true,
        parsers: [],
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_PARSERS)
          : state.apiError,
      };

    case Types.FETCHING_PARSERS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        parsers: action.payload.parsers,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    default:
      return state;
  }
}
