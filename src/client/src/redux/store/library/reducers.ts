import * as Types from "./types";
import { ObjectType } from "../../../models";

const initialState: Types.LibraryState = {
  fetching: false,
  nodeTypes: [],
  apiError: [],
  transportTypes: [],
  interfaceTypes: [],
};

export function libraryReducer(state = initialState, action: Types.LibraryActionTypes) {
  switch (action.type) {
    case Types.FETCHING_LIBRARY:
      return {
        ...state,
        fetching: true,
        nodeTypes: [],
        transportTypes: [],
        interfaceTypes: [],
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_LIBRARY) : state.apiError,
      };
    case Types.FETCHING_LIBRARY_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        nodeTypes: action.payload.nodeTypes,
        transportTypes: action.payload.transportTypes,
        interfaceTypes: action.payload.interfaceTypes,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.DELETE_LIBRARY_ERROR:
      return {
        ...state,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError,
      };

    case Types.EXPORT_LIBRARY:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.EXPORT_LIBRARY) : state.apiError,
      };

    case Types.EXPORT_LIBRARY_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.IMPORT_LIBRARY:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.IMPORT_LIBRARY) : state.apiError,
      };

    case Types.IMPORT_LIBRARY_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.FETCHING_LIBRARY_TRANSPORT_TYPES:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_LIBRARY_TRANSPORT_TYPES)
          : state.apiError,
      };

    case Types.FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
        transportTypes: action.payload.transports,
      };

    case Types.FETCHING_LIBRARY_INTERFACE_TYPES:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_LIBRARY_INTERFACE_TYPES)
          : state.apiError,
      };

    case Types.FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
        interfaceTypes: action.payload.transports,
      };

    case Types.REMOVE_LIBRARY_ITEM:
      return {
        ...state,
        interfaceTypes: state.interfaceTypes.filter((x) => x.id !== action.payload.id),
        nodeTypes: state.nodeTypes.filter((x) => x.id !== action.payload.id),
        transportTypes: state.transportTypes.filter((x) => x.id !== action.payload.id),
      };

    case Types.ADD_LIBRARY_ITEM:
      return {
        ...state,
        interfaceTypes:
          action.payload.libraryType === ObjectType.Interface
            ? [...state.interfaceTypes, action.payload]
            : state.interfaceTypes,
        nodeTypes:
          action.payload.libraryType === ObjectType.ObjectBlock ? [...state.nodeTypes, action.payload] : state.nodeTypes,
        transportTypes:
          action.payload.libraryType === ObjectType.Transport
            ? [...state.transportTypes, action.payload]
            : state.transportTypes,
      };

    default:
      return state;
  }
}
