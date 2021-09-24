import { ObjectType } from "../../../models";
import {
    FETCHING_LIBRARY,
    FETCHING_LIBRARY_SUCCESS_OR_ERROR,
    DELETE_LIBRARY_ERROR,
    LibraryActionTypes,
    LibraryState,
    EXPORT_LIBRARY,
    EXPORT_LIBRARY_SUCCESS_OR_ERROR,
    IMPORT_LIBRARY,
    IMPORT_LIBRARY_SUCCESS_OR_ERROR,
    FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR,
    FETCHING_LIBRARY_TRANSPORT_TYPES,
    FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR,
    FETCHING_LIBRARY_INTERFACE_TYPES,
    ADD_LIBRARY_ITEM,
    REMOVE_LIBRARY_ITEM,
} from "./types";

const initialState: LibraryState = {
    fetching: false,
    nodeTypes: [],
    apiError: [],
    transportTypes: [],
    interfaceTypes: [],
};

export function libraryReducer(
    state = initialState,
    action: LibraryActionTypes
) {
    switch (action.type) {
        case FETCHING_LIBRARY:
            return {
                ...state,
                fetching: true,
                nodeTypes: [],
                transportTypes: [],
                interfaceTypes: [],
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== FETCHING_LIBRARY)
                    : state.apiError,
            };
        case FETCHING_LIBRARY_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                nodeTypes: action.payload.nodeTypes,
                transportTypes: action.payload.transportTypes,
                interfaceTypes: action.payload.interfaceTypes,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };

        case DELETE_LIBRARY_ERROR:
            return {
                ...state,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== action.payload.key)
                    : state.apiError,
            };

        case EXPORT_LIBRARY:
            return {
                ...state,
                fetching: true,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== EXPORT_LIBRARY)
                    : state.apiError,
            };

        case EXPORT_LIBRARY_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };

        case IMPORT_LIBRARY:
            return {
                ...state,
                fetching: true,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== IMPORT_LIBRARY)
                    : state.apiError,
            };

        case IMPORT_LIBRARY_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };

        case FETCHING_LIBRARY_TRANSPORT_TYPES:
            return {
                ...state,
                fetching: true,
                apiError: state.apiError
                    ? state.apiError.filter(
                        (elem) => elem.key !== FETCHING_LIBRARY_TRANSPORT_TYPES
                    )
                    : state.apiError,
            };

        case FETCHING_LIBRARY_TRANSPORT_TYPES_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
                transportTypes: action.payload.transports,
            };

        case FETCHING_LIBRARY_INTERFACE_TYPES:
            return {
                ...state,
                fetching: true,
                apiError: state.apiError
                    ? state.apiError.filter(
                        (elem) => elem.key !== FETCHING_LIBRARY_INTERFACE_TYPES
                    )
                    : state.apiError,
            };

        case FETCHING_LIBRARY_INTERFACE_TYPES_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
                interfaceTypes: action.payload.transports,
            };

        case REMOVE_LIBRARY_ITEM:
            return {
                ...state,
                interfaceTypes: state.interfaceTypes.filter(
                    (x) => x.id !== action.payload.id
                ),
                nodeTypes: state.nodeTypes.filter(
                    (x) => x.id !== action.payload.id
                ),
                transportTypes: state.transportTypes.filter(
                    (x) => x.id !== action.payload.id
                ),
            };

        case ADD_LIBRARY_ITEM:
            return {
                ...state,
                interfaceTypes:
                    action.payload.libraryType === ObjectType.Interface
                        ? [...state.interfaceTypes, action.payload]
                        : state.interfaceTypes,
                nodeTypes:
                    action.payload.libraryType === ObjectType.ObjectBlock
                        ? [...state.nodeTypes, action.payload]
                        : state.nodeTypes,
                transportTypes:
                    action.payload.libraryType === ObjectType.Transport
                        ? [...state.transportTypes, action.payload]
                        : state.transportTypes,
            };

        default:
            return state;
    }
}
