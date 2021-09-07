import {
    CreateLibraryType,
    Aspect,
    ObjectType,
    TypeMode,
    BlobData,
    TerminalTypeItem,
    PredefinedAttribute,
    UpdateLibraryType,
} from "../../../models";
import {
    FETCHING_INITIAL_DATA,
    FETCHING_INITIAL_SUCCESS_OR_ERROR,
    FETCHING_RDS,
    FETCHING_RDS_SUCCESS_OR_ERROR,
    FETCHING_TERMINALS,
    FETCHING_TERMINALS_SUCCESS_OR_ERROR,
    FETCHING_ATTRIBUTES,
    FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
    FETCHING_LOCATIONTYPES,
    FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR,
    FETCHING_PREDEFINED_ATTRIBUTES,
    FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR,
    FETCHING_TYPE,
    FETCHING_TYPE_SUCCESS_OR_ERROR,
    FETCHING_BLOB_DATA,
    FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
    CHANGE_SELECTED_TYPE,
    CHANGE_MODE,
    CHOOSE_ASPECT,
    CHOOSE_OBJECT_TYPE,
    CHOOSE_TYPENAME,
    CHOOSE_SYMBOL,
    CHOOSE_RDS,
    CHOOSE_RDS_NAME,
    CHOOSE_TERMINAL_NAME,
    CHOOSE_TERMINAL_CATEGORY,
    CHOOSE_TERMINAL_COLOR,
    CHOOSE_SEMANTICREFERENCE,
    CHOOSE_LOCATION_TYPE,
    CHOOSE_TERMINAL_TYPE_ID,
    CHOOSE_PREDEFINED_ATTRIBUTES,
    CHOOSE_TERMINALTYPE,
    CHOOSE_ATTRIBUTETYPES,
    CHANGE_ASPECT,
    CHANGE_OBJECT_TYPE,
    CHANGE_TYPENAME,
    CHANGE_SYMBOL,
    CHANGE_RDS,
    CHANGE_SEMANTICREFERENCE,
    CHANGE_LOCATION_TYPE,
    CHANGE_TERMINAL_TYPE_ID,
    CHANGE_PREDEFINED_ATTRIBUTES,
    CHANGE_TERMINALTYPE,
    CHANGE_ATTRIBUTETYPES,
    REMOVE_TERMINALTYPES,
    CREATING_TYPE,
    CREATING_TYPE_SUCCESS_OR_ERROR,
    UPDATING_TYPE,
    UPDATING_TYPE_SUCCESS_OR_ERROR,
    DELETE_TYPE_EDITOR_ERROR,
    TypeEditorActionTypes,
    TypeEditorState,
} from "./types";

const initialState: TypeEditorState = {
    fetching: false,
    creating: false,
    mode: TypeMode.NotSet,
    selectedType: "",
    selectedNode: {} as UpdateLibraryType,
    rdsName: "",
    terminalName: "",
    terminalCategory: "",
    terminalColor: "",
    createLibraryType: {
        name: "",
        aspect: Aspect.NotSet,
        objectType: ObjectType.NotSet,
        semanticReference: "",
        rdsId: "",
        terminalTypes: [] as TerminalTypeItem[],
        attributeTypes: [] as string[],
        locationType: "",
        predefinedAttributes: [] as PredefinedAttribute[],
        terminalTypeId: "",
        symbolId: "",
    } as CreateLibraryType,
    objectTypes: {},
    aspects: {},
    rdsList: [],
    terminals: [],
    attributes: [],
    locationTypes: [],
    predefinedAttributes: [],
    apiError: [],
    icons: [] as BlobData[],
};

// TODO: Refactor to reduce complexity
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
        case FETCHING_LOCATIONTYPES:
            return {
                ...state,
                fetching: true,
            };
        case FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                locationTypes: action.payload.locationTypes,
            };
        case FETCHING_PREDEFINED_ATTRIBUTES:
            return {
                ...state,
                fetching: true,
            };
        case FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                predefinedAttributes: action.payload.predefinedAttributes,
            };
        case FETCHING_TYPE:
            return {
                ...state,
                fetching: true,
            };
        case FETCHING_TYPE_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                selectedNode: action.payload.selectedNode,
                createLibraryType: action.payload.selectedNode
            };
        case FETCHING_BLOB_DATA:
            return {
                ...state,
                fetching: true,
                apiError: state.apiError
                    ? state.apiError.filter(
                        (elem) => elem.key !== FETCHING_BLOB_DATA_SUCCESS_OR_ERROR
                    )
                    : state.apiError,
            };
        case FETCHING_BLOB_DATA_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                icons: action.payload.icons,
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };
        case CHANGE_SELECTED_TYPE:
            return {
                ...state,
                selectedType: action.payload.selectedType,
            };
        case CHANGE_MODE:
            return {
                ...state,
                mode: action.payload.mode,
            };
        case CHOOSE_ASPECT:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    aspect: action.payload.aspect,
                },
            };
        case CHOOSE_OBJECT_TYPE:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    objectType: action.payload.objectType,
                },
            };
        case CHOOSE_TYPENAME:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    name: action.payload.typeName,
                },
            };
        case CHOOSE_SYMBOL:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    symbolId: action.payload.symbolId,
                },
            };
        case CHOOSE_RDS:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    rdsId: action.payload.rds,
                },
            };
        case CHOOSE_RDS_NAME:
            return {
                ...state,
                rdsName: action.payload.rdsName,
            };
        case CHOOSE_TERMINAL_NAME:
            return {
                ...state,
                terminalName: action.payload.terminalName,
            };
        case CHOOSE_TERMINAL_CATEGORY:
            return {
                ...state,
                terminalCategory: action.payload.terminalCategory,
            };
        case CHOOSE_TERMINAL_COLOR:
            return {
                ...state,
                terminalColor: action.payload.terminalColor,
            };
        case CHOOSE_SEMANTICREFERENCE:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    semanticReference: action.payload.semanticReference,
                },
            };
        case CHOOSE_LOCATION_TYPE:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    locationType: action.payload.locationType,
                },
            };
        case CHOOSE_TERMINAL_TYPE_ID:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    terminalTypeId: action.payload.terminalTypeId,
                },
            };
        case CHOOSE_PREDEFINED_ATTRIBUTES:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    predefinedAttributes: action.payload.predefinedAttributes,
                },
            };
        case CHOOSE_TERMINALTYPE:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    terminalTypes: [
                        ...state.createLibraryType.terminalTypes,
                        action.payload.terminal,
                    ],
                },
            };
        case CHOOSE_ATTRIBUTETYPES:
            return {
                ...state,
                createLibraryType: {
                    ...state.createLibraryType,
                    attributeTypes: action.payload.attributeTypes,
                },
            };
        case CHANGE_ASPECT:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    aspect: action.payload.aspect,
                },
            };
        case CHANGE_OBJECT_TYPE:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    objectType: action.payload.objectType,
                },
            };
        case CHANGE_TYPENAME:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    name: action.payload.typeName,
                },
            };
        case CHANGE_SYMBOL:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    symbolId: action.payload.symbolId,
                },
            };
        case CHANGE_RDS:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    rdsId: action.payload.rds,
                },
            };
        case CHANGE_SEMANTICREFERENCE:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    semanticReference: action.payload.semanticReference,
                },
            };
        case CHANGE_LOCATION_TYPE:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    locationType: action.payload.locationType,
                },
            };
        case CHANGE_TERMINAL_TYPE_ID:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    terminalTypeId: action.payload.terminalTypeId,
                },
            };
        case CHANGE_PREDEFINED_ATTRIBUTES:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    predefinedAttributes: action.payload.predefinedAttributes,
                },
            };
        case CHANGE_TERMINALTYPE:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    terminalTypes: [
                        ...state.selectedNode.terminalTypes,
                        action.payload.terminal,
                    ],
                },
            };
        case CHANGE_ATTRIBUTETYPES:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    attributeTypes: action.payload.attributeTypes,
                },
            };
        case REMOVE_TERMINALTYPES:
            return {
                ...state,
                selectedNode: {
                    ...state.selectedNode,
                    terminalTypes: [],
                },
                createLibraryType: {
                    ...state.createLibraryType,
                    terminalTypes: [],
                },
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
                createLibraryType: {
                    ...state.createLibraryType,
                    name: "",
                    aspect: Aspect.NotSet,
                    objectType: ObjectType.NotSet,
                    semanticReference: "",
                    rdsId: "",
                    terminalTypes: [] as TerminalTypeItem[],
                    attributeTypes: [] as string[],
                    locationType: "",
                    predefinedAttributes: [] as PredefinedAttribute[],
                    terminalTypeId: "",
                    symbolId: "",
                },
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };
        case UPDATING_TYPE:
            return {
                ...state,
                fetching: true,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== UPDATING_TYPE)
                    : state.apiError,
            };
        case UPDATING_TYPE_SUCCESS_OR_ERROR:
            return {
                ...state,
                fetching: false,
                selectedType: "",
                selectedNode: {
                    ...state.selectedNode,
                    name: "",
                    aspect: Aspect.NotSet,
                    objectType: ObjectType.NotSet,
                    semanticReference: "",
                    rdsId: "",
                    terminalTypes: [] as TerminalTypeItem[],
                    attributeTypes: [] as string[],
                    locationType: "",
                    predefinedAttributes: [] as PredefinedAttribute[],
                    terminalTypeId: "",
                    symbolId: "",
                },
                apiError: action.payload.apiError
                    ? [...state.apiError, action.payload.apiError]
                    : state.apiError,
            };
        case DELETE_TYPE_EDITOR_ERROR:
            return {
                ...state,
                apiError: state.apiError
                    ? state.apiError.filter((elem) => elem.key !== action.payload.key)
                    : state.apiError,
            };
        default:
            return state;
    }
}
