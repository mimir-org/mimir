import { CreateLibraryType, Status, Aspect, ObjectType } from "../../../models";

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
    CHANGE_OBJECTTYPE,
    CHANGE_TYPENAME,
    CHANGE_MODE,
    CHANGE_STATUS,
    CHANGE_RDS,
    CHANGE_SEMANTICREFERENCE,
    UPDATE_TERMINALTYPES,
    UPDATE_ATTRIBUTETYPES,
    CREATING_TYPE,
    CREATING_TYPE_SUCCESS_OR_ERROR,
    DELETE_TYPE_EDITOR_ERROR,
    TypeEditorActionTypes,
    TypeEditorState,
} from "./types";

const initialState: TypeEditorState = {
    fetching: false,
    creating: false,
    mode: "NotSet",
    createLibraryType: {
        name: "",
        status: Status.Draft,
        aspect: Aspect.NotSet,
        objectType: ObjectType.NotSet,
        semanticReference: null,
        rdsId: "",
        terminalTypes: [],
        attributeTypes: [] as string[],
        terminalTypeId: null,
    } as CreateLibraryType,
    objectTypes: {},
    aspects: {},
    statuses: {},
    rdsList: [],
    terminals: [],
    attributes: [],
    apiError: [],
};

export function typeEditorReducer(
    state = initialState,
    action: TypeEditorActionTypes
): TypeEditorState {
    switch (action.type) {
        case DELETE_TYPE_EDITOR_ERROR:
            return {
                ...state,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== action.payload.key)
                    : state.apiError,
            };
        case CREATING_TYPE:
            return {
                ...state,
                fetching: true,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== CREATING_TYPE)
                    : state.apiError,
            };
        case CREATING_TYPE_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
                createLibraryType: action.payload.apiError
                    ? state.createLibraryType
                    : {
                        name: "",
                        status: Status.Draft,
                        aspect: Aspect.NotSet,
                        objectType: ObjectType.NotSet,
                        semanticReference: null,
                        rdsId: "",
                        terminalTypes: [],
                        attributeTypes: [] as string[],
                        terminalTypeId: null,
                    } as CreateLibraryType
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
                createLibraryType: {
                    ...state.createLibraryType,
                    aspect: action.payload.aspect,
                },
            };
        case CHANGE_OBJECTTYPE:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    objectType: action.payload.objectType,
                },
            };
        case CHANGE_TYPENAME:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    name: action.payload.typeName,
                },
            };
        case CHANGE_STATUS:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    status: action.payload.status,
                },
            };
        case CHANGE_RDS:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    rdsId: action.payload.rds,
                },
            };
        case CHANGE_SEMANTICREFERENCE:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    semanticReference: action.payload.semanticReference,
                },
            };
        case UPDATE_TERMINALTYPES:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    terminalTypes: action.payload.terminalTypes,
                },
            };
        case UPDATE_ATTRIBUTETYPES:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    attributeTypes: action.payload.attributeTypes,
                },
            };
        default:
            return state;
    }
}
