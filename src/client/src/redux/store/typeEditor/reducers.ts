import {
  CreateLibraryType,
  Aspect,
  ObjectType,
  BlobData,
  TerminalTypeItem,
  PredefinedAttribute,
  CompositeType,
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
  FETCHING_BLOB_DATA,
  FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
  FETCHING_COMPOSITE_TYPES,
  FETCHING_COMPOSITE_TYPES_SUCCESS_OR_ERROR,
  FETCHING_TYPE,
  FETCHING_TYPE_SUCCESS_OR_ERROR,
  OPEN_TYPE_EDITOR,
  CLOSE_TYPE_EDITOR,
  UPDATE_CREATELIBRARYTYPE,
  ADD_TERMINALTYPE,
  REMOVE_TERMINALTYPE,
  UPDATE_TERMINALTYPE,
  SAVE_LIBRARY_TYPE,
  SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
  DELETE_TYPE_EDITOR_ERROR,
  TypeEditorActionTypes,
  TypeEditorState,
} from "./types";

const initialState: TypeEditorState = {
  visible: false,
  fetching: false,
  creating: false,
  createLibraryType: {
    libraryId: null,
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
    compositeTypes: [] as string[],
  } as CreateLibraryType,
  aspects: {},
  objectTypes: {},
  rdsList: [],
  terminals: [],
  attributes: [],
  locationTypes: [],
  predefinedAttributes: [],
  compositeTypes: [],
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
        visible: false,
        createLibraryType: {
          ...state.createLibraryType,
          libraryId: null,
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
          compositeTypes: [] as string[],
        },
      };
    case FETCHING_TYPE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        visible: true,
        createLibraryType: action.payload.selectedNode,
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
    case FETCHING_COMPOSITE_TYPES:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError
          ? state.apiError.filter(
              (elem) => elem.key !== FETCHING_COMPOSITE_TYPES_SUCCESS_OR_ERROR
            )
          : state.apiError,
      };
    case FETCHING_COMPOSITE_TYPES_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        compositeTypes: action.payload.compositeTypes,
        apiError: action.payload.apiError
          ? [...state.apiError, action.payload.apiError]
          : state.apiError,
      };
    case OPEN_TYPE_EDITOR:
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
    case CLOSE_TYPE_EDITOR:
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
    case UPDATE_CREATELIBRARYTYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          [action.payload.key]: action.payload.value,
        },
      };
    case ADD_TERMINALTYPE:
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
    case REMOVE_TERMINALTYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypes: [
            ...state.createLibraryType.terminalTypes.filter(
              (terminal) => terminal.row !== action.payload.terminal.row
            ),
          ],
        },
      };
    case UPDATE_TERMINALTYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypes: [
            ...state.createLibraryType.terminalTypes.map((terminal) =>
              terminal.row === action.payload.terminal.row
                ? action.payload.terminal
                : terminal
            ),
          ],
        },
      };
    case SAVE_LIBRARY_TYPE:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== SAVE_LIBRARY_TYPE)
          : state.apiError,
      };
    case SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR:
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
          compositeTypes: [] as string[],
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
