import { Dictionary } from "../../../models/project";
import { ApiError } from "../../../models/webclient";
import {
    TypeMode,
    AttributeType,
    CreateLibraryType,
    Rds,
    TerminalType,
    TerminalTypeItem,
    Aspect,
    ObjectType,
    LocationType,
    PredefinedAttribute,
    BlobData,
} from "../../../models";

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
export const FETCHING_LOCATIONTYPES = "FETCHING_LOCATIONTYPES";
export const FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR =
    "FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR";
export const FETCHING_PREDEFINED_ATTRIBUTES = "FETCHING_PREDEFINED_ATTRIBUTES";
export const FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR =
    "FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR";
export const CHANGE_ASPECT = "CHANGE_ASPECT";
export const CHANGE_OBJECT_TYPE = "CHANGE_OBJECT_TYPE";
export const CHANGE_TYPENAME = "CHANGE_TYPENAME";
export const CHANGE_MODE = "CHANGE_MODE";
export const CHANGE_SELECTED_TYPE = "CHANGE_SELECTED_TYPE";
export const CHANGE_TERMINAL_CATEGORY = "CHANGE_TERMINAL_CATEGORY";
export const CHANGE_TERMINAL_COLOR = "CHANGE_TERMINAL_COLOR";
export const CREATING_TYPE = "CREATING_TYPE";
export const UPDATING_TYPE = "UPDATING_TYPE";
export const SET_RDS = "SET_RDS";
export const SET_RDS_NAME = "SET_RDS_NAME";
export const CHANGE_SEMANTICREFERENCE = "CHANGE_SEMANTICREFERENCE";
export const CHANGE_LOCATION_TYPE = "CHANGE_LOCATION_TYPE";
export const CHANGE_TERMINAL_TYPE_ID = "CHANGE_TERMINAL_TYPE_ID";
export const UPDATE_PREDEFINED_ATTRIBUTES = "UPDATE_PREDEFINED_ATTRIBUTES";
export const ADD_TERMINALTYPE = "ADD_TERMINALTYPE";
export const REMOVE_TERMINALTYPES = "REMOVE_TERMINALTYPES";
export const UPDATE_ATTRIBUTETYPES = "UPDATE_ATTRIBUTETYPES";
export const CREATING_TYPE_SUCCESS_OR_ERROR = "CREATING_TYPE_SUCCESS_OR_ERROR";
export const UPDATE_TYPE_SUCCESS_OR_ERROR = "UPDATE_TYPE_SUCCESS_OR_ERROR";
export const DELETE_TYPE_EDITOR_ERROR = "DELETE_TYPE_EDITOR_ERROR";
export const FETCHING_BLOB_DATA = "FETCHING_BLOB_DATA";
export const FETCHING_BLOB_DATA_SUCCESS_OR_ERROR =
    "FETCHING_BLOB_DATA_SUCCESS_OR_ERROR";
export const CHANGE_SYMBOL = "CHANGE_SYMBOL";

// State types
export interface TypeEditorState {
    fetching: boolean;
    creating: boolean;
    createLibraryType: CreateLibraryType;
    aspects: object;
    objectTypes: object;
    statuses: object;
    rdsList: Rds[];
    terminals: TerminalType[];
    attributes: AttributeType[];
    mode: TypeMode;
    rdsName: string;
    terminalCategory: string;
    terminalColor: string;
    locationTypes: LocationType[];
    predefinedAttributes: PredefinedAttribute[];
    apiError: ApiError[];
    selectedType: string;
    icons: BlobData[];
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
        aspect: Aspect;
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
        aspect: Aspect;
    };
}

interface FetchingAttributesActionFinished {
    type: typeof FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR;
    payload: {
        AttributeType: AttributeType[];
    };
}

interface FetchingLocationTypesAction {
    type: typeof FETCHING_LOCATIONTYPES;
    payload: null;
}

interface FetchingLocationTypesActionFinished {
    type: typeof FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR;
    payload: {
        locationTypes: LocationType[];
    };
}

interface FetchingPredefinedAttributesAction {
    type: typeof FETCHING_PREDEFINED_ATTRIBUTES;
    payload: null;
}

interface FetchingPredefinedAttributesActionFinished {
    type: typeof FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR;
    payload: {
        predefinedAttributes: PredefinedAttribute[];
    };
}

export interface ChangeSelectedAspect {
    type: typeof CHANGE_ASPECT;
    payload: {
        aspect: Aspect;
    };
}

export interface ChangeObjectType {
    type: typeof CHANGE_OBJECT_TYPE;
    payload: {
        objectType: ObjectType;
    };
}

export interface ChangeTypeName {
    type: typeof CHANGE_TYPENAME;
    payload: {
        typeName: string;
    };
}
export interface SetRds {
    type: typeof SET_RDS;
    payload: {
        rds: string;
    };
}

export interface SetRdsName {
    type: typeof SET_RDS_NAME;
    payload: {
        rdsName: string;
    };
}

export interface ChangeTerminalCategory {
    type: typeof CHANGE_TERMINAL_CATEGORY;
    payload: {
        terminalCategory: string;
    };
}

export interface ChangeTerminalColor {
    type: typeof CHANGE_TERMINAL_COLOR;
    payload: {
        terminalColor: string;
    };
}

export interface ChangeTerminalTypeId {
    type: typeof CHANGE_TERMINAL_TYPE_ID;
    payload: {
        terminalTypeId: string;
    };
}

export interface ChangeSemanticReference {
    type: typeof CHANGE_SEMANTICREFERENCE;
    payload: {
        semanticReference: string;
    };
}

export interface ChangeLocationType {
    type: typeof CHANGE_LOCATION_TYPE;
    payload: {
        locationType: string;
    };
}

export interface UpdatePredefinedAttributes {
    type: typeof UPDATE_PREDEFINED_ATTRIBUTES;
    payload: {
        predefinedAttributes: PredefinedAttribute[];
    };
}

export interface AddTerminalType {
    type: typeof ADD_TERMINALTYPE;
    payload: {
        terminal: TerminalTypeItem;
    };
}

export interface RemoveTerminalTypes {
    type: typeof REMOVE_TERMINALTYPES;
    payload: {};
}

export interface UpdateAttributesTypes {
    type: typeof UPDATE_ATTRIBUTETYPES;
    payload: {
        attributeTypes: string[];
    };
}

export interface ChangeMode {
    type: typeof CHANGE_MODE;
    payload: {
        mode: TypeMode;
    };
}
interface CreatingTypeAction {
    type: typeof CREATING_TYPE;
    payload: {
        libraryType: CreateLibraryType;
    };
}
interface UpdatingTypeAction {
    type: typeof UPDATING_TYPE;
    payload: {
        libraryType: CreateLibraryType;
    };
}

interface CreatingTypeActionFinished {
    type: typeof CREATING_TYPE_SUCCESS_OR_ERROR;
    payload: {
        apiError: ApiError;
    };
}

interface DeleteTypeEditorErrorAction {
    type: typeof DELETE_TYPE_EDITOR_ERROR;
    payload: {
        key: string;
    };
}

export interface FetchingBlobDataAction {
    type: typeof FETCHING_BLOB_DATA;
    payload: null;
}

export interface FetchingBlobDataActionFinished {
    type: typeof FETCHING_BLOB_DATA_SUCCESS_OR_ERROR;
    payload: {
        apiError: ApiError;
        icons: BlobData[];
    };
}

export interface ChangeSymbol {
    type: typeof CHANGE_SYMBOL;
    payload: {
        symbolId: string;
    };
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
    | FetchingLocationTypesAction
    | FetchingLocationTypesActionFinished
    | FetchingPredefinedAttributesAction
    | FetchingPredefinedAttributesActionFinished
    | ChangeSelectedAspect
    | ChangeObjectType
    | ChangeTypeName
    | SetRds
    | SetRdsName
    | ChangeTerminalCategory
    | ChangeTerminalColor
    | ChangeTerminalTypeId
    | ChangeSemanticReference
    | ChangeLocationType
    | UpdatePredefinedAttributes
    | AddTerminalType
    | RemoveTerminalTypes
    | UpdateAttributesTypes
    | ChangeMode
    | UpdatingTypeAction
    | CreatingTypeAction
    | CreatingTypeActionFinished
    | DeleteTypeEditorErrorAction
    | FetchingBlobDataAction
    | FetchingBlobDataActionFinished
    | ChangeSymbol;
