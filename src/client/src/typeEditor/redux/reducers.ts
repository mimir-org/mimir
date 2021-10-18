import * as Types from "./types";
import { CreateLibraryType, Aspect, ObjectType, BlobData, TerminalTypeItem, PredefinedAttribute } from "../../models";

const initialState: Types.TypeEditorState = {
  visible: false,
  fetching: false,
  creating: false,
  createLibraryType: {
    libraryId: null,
    name: "",
    aspect: Aspect.NotSet,
    objectType: ObjectType.NotSet,
    purpose: "",
    semanticReference: "",
    rdsId: "",
    terminalTypes: [] as TerminalTypeItem[],
    attributeTypes: [] as string[],
    locationType: "",
    predefinedAttributes: [] as PredefinedAttribute[],
    terminalTypeId: "",
    symbolId: "",
    compositeTypes: [] as string[],
  } as CreateLibraryType,
  purposes: [],
  rdsList: [],
  terminals: [],
  attributes: [],
  locationTypes: [],
  predefinedAttributes: [],
  simpleTypes: [],
  apiError: [],
  icons: [] as BlobData[],
};

// TODO: Refactor to reduce complexity
export function typeEditorReducer(state = initialState, action: Types.TypeEditorActionTypes): Types.TypeEditorState {
  switch (action.type) {
    case Types.FETCHING_INITIAL_DATA:
      return {
        ...state,
        fetching: true,
      };
    case Types.FETCHING_INITIAL_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        purposes: action.payload.purposes,
      };
    case Types.FETCHING_RDS:
      return {
        ...state,
        fetching: true,
      };
    case Types.FETCHING_RDS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        rdsList: action.payload.Rds ? action.payload.Rds : [],
      };
    case Types.FETCHING_TERMINALS:
      return {
        ...state,
        fetching: true,
      };
    case Types.FETCHING_TERMINALS_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        terminals: action.payload.terminals,
      };
    case Types.FETCHING_ATTRIBUTES:
      return {
        ...state,
        fetching: true,
      };
    case Types.FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        attributes: action.payload.AttributeType ? action.payload.AttributeType : [],
      };
    case Types.FETCHING_LOCATIONTYPES:
      return {
        ...state,
        fetching: true,
      };
    case Types.FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        locationTypes: action.payload.locationTypes,
      };
    case Types.FETCHING_PREDEFINED_ATTRIBUTES:
      return {
        ...state,
        fetching: true,
      };
    case Types.FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        predefinedAttributes: action.payload.predefinedAttributes,
      };
    case Types.FETCHING_TYPE:
      return {
        ...state,
        fetching: true,
        visible: false,
        createLibraryType: {
          ...state.createLibraryType,
          libraryId: null,
          name: "",
          aspect: Aspect.NotSet,
          objectType: ObjectType.NotSet,
          purpose: "",
          semanticReference: "",
          rdsId: "",
          terminalTypes: [] as TerminalTypeItem[],
          attributeTypes: [] as string[],
          locationType: "",
          predefinedAttributes: [] as PredefinedAttribute[],
          terminalTypeId: "",
          symbolId: "",
          compositeTypes: [] as string[],
        },
      };
    case Types.FETCHING_TYPE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        visible: true,
        createLibraryType: action.payload.selectedNode,
      };
    case Types.FETCHING_BLOB_DATA:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_BLOB_DATA_SUCCESS_OR_ERROR)
          : state.apiError,
      };
    case Types.FETCHING_BLOB_DATA_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        icons: action.payload.icons,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };
    case Types.FETCHING_SIMPLE_TYPES:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR)
          : state.apiError,
      };
    case Types.FETCHING_SIMPLE_TYPES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        simpleTypes: action.payload.simpleTypes,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };
    case Types.OPEN_TYPE_EDITOR:
      return {
        ...state,
        fetching: false,
        visible: true,
        createLibraryType: {
          ...state.createLibraryType,
          libraryId: null,
          name: "",
          aspect: Aspect.NotSet,
          objectType: ObjectType.NotSet,
          purpose: "",
          semanticReference: "",
          rdsId: "",
          terminalTypes: [] as TerminalTypeItem[],
          attributeTypes: [] as string[],
          locationType: "",
          predefinedAttributes: [] as PredefinedAttribute[],
          terminalTypeId: "",
          symbolId: "",
          compositeTypes: [] as string[],
        },
      };
    case Types.CLOSE_TYPE_EDITOR:
      return {
        ...state,
        fetching: false,
        visible: false,
        createLibraryType: {
          ...state.createLibraryType,
          libraryId: null,
          name: "",
          aspect: Aspect.NotSet,
          objectType: ObjectType.NotSet,
          purpose: "",
          semanticReference: "",
          rdsId: "",
          terminalTypes: [] as TerminalTypeItem[],
          attributeTypes: [] as string[],
          locationType: "",
          predefinedAttributes: [] as PredefinedAttribute[],
          terminalTypeId: "",
          symbolId: "",
          compositeTypes: [] as string[],
        },
      };
    case Types.UPDATE_CREATELIBRARYTYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          [action.payload.key]: action.payload.value,
        },
      };
    case Types.ADD_TERMINALTYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypes: [...state.createLibraryType.terminalTypes, action.payload.terminal],
        },
      };
    case Types.REMOVE_TERMINALTYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypes: [
            ...state.createLibraryType.terminalTypes.filter(
              (terminal) => terminal.terminalId !== action.payload.terminal.terminalId
            ),
          ],
        },
      };
    case Types.UPDATE_TERMINALTYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypes: [
            ...state.createLibraryType.terminalTypes.map((terminal) =>
              terminal.terminalId === action.payload.terminal.terminalId ? action.payload.terminal : terminal
            ),
          ],
        },
      };
    case Types.REMOVE_TERMINALTYPE_BY_CATEGORY:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypes: [
            ...state.createLibraryType.terminalTypes.filter(
              (terminal) => terminal.categoryId !== action.payload.categoryId
            ),
          ],
        },
      };
    case Types.SAVE_LIBRARY_TYPE:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.SAVE_LIBRARY_TYPE)
          : state.apiError,
      };
    case Types.SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        createLibraryType: {
          ...state.createLibraryType,
          name: "",
          aspect: Aspect.NotSet,
          objectType: ObjectType.NotSet,
          purpose: "",
          semanticReference: "",
          rdsId: "",
          terminalTypes: [] as TerminalTypeItem[],
          attributeTypes: [] as string[],
          locationType: "",
          predefinedAttributes: [] as PredefinedAttribute[],
          terminalTypeId: "",
          symbolId: "",
          compositeTypes: [] as string[],
        },
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };
    case Types.DELETE_TYPE_EDITOR_ERROR:
      return {
        ...state,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError,
      };
    default:
      return state;
  }
}
