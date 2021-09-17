import {
  CreateLibraryType,
  Aspect,
  ObjectType,
  TypeMode,
  BlobData,
  TerminalTypeItem,
  PredefinedAttribute,
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
  CLOSE_TYPE_EDITOR,
  OPEN_TYPE_EDITOR,
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
  REMOVE_TERMINALTYPE,
  UPDATE_TERMINALTYPE,
  SAVE_LIBRARY_TYPE,
  SAVE_LIBRARY_TYPE_SUCCESS_OR_ERROR,
  DELETE_TYPE_EDITOR_ERROR,
  TypeEditorActionTypes,
  TypeEditorState,
  UPDATE_CREATELIBRARYTYPE,
} from "./types";

const initialState: TypeEditorState = {
  visible: false,
  fetching: false,
  creating: false,
  mode: TypeMode.NotSet,
  rdsName: "",
  terminalName: "",
  terminalCategory: "",
  terminalColor: "",
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
        },
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
    case CHOOSE_ATTRIBUTETYPES:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          attributeTypes: action.payload.attributeTypes,
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
