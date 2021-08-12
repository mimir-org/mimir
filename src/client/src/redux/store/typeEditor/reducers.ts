import {
  CreateLibraryType,
  Status,
  Aspect,
  ObjectType,
  TypeMode,
  BlobData,
  TerminalTypeItem,
  PredefinedAttribute,
} from "../../../models";
import {
  FETCHING_RDS,
  FETCHING_RDS_SUCCESS_OR_ERROR,
  FETCHING_INITIAL_DATA,
  FETCHING_INITIAL_SUCCESS_OR_ERROR,
  FETCHING_TERMINALS,
  FETCHING_TERMINALS_SUCCESS_OR_ERROR,
  FETCHING_ATTRIBUTES,
  FETCHING_ATTRIBUTES_SUCCESS_OR_ERROR,
  FETCHING_LOCATIONTYPES,
  FETCHING_LOCATIONTYPES_SUCCESS_OR_ERROR,
  FETCHING_PREDEFINED_ATTRIBUTES,
  FETCHING_PREDEFINED_ATTRIBUTES_SUCCESS_OR_ERROR,
  CHANGE_ASPECT,
  CHANGE_OBJECT_TYPE,
  CHANGE_TYPENAME,
  CHANGE_SELECTED_TYPE,
  CHANGE_MODE,
  CHANGE_STATUS,
  SET_RDS,
  SET_RDS_NAME,
  CHANGE_TERMINAL_CATEGORY,
  CHANGE_TERMINAL_COLOR,
  CHANGE_SEMANTICREFERENCE,
  CHANGE_LOCATION_TYPE,
  CHANGE_TERMINAL_TYPE_ID,
  UPDATE_PREDEFINED_ATTRIBUTES,
  ADD_TERMINALTYPE,
  UPDATE_ATTRIBUTETYPES,
  CREATING_TYPE,
  CREATING_TYPE_SUCCESS_OR_ERROR,
  DELETE_TYPE_EDITOR_ERROR,
  TypeEditorActionTypes,
  TypeEditorState,
  FETCHING_TYPE,
  FETCHING_TYPE_SUCCESS_OR_ERROR,
  FETCHING_BLOB_DATA,
  FETCHING_BLOB_DATA_SUCCESS_OR_ERROR,
  CHANGE_SYMBOL,
  REMOVE_TERMINALTYPES,
} from "./types";

const initialState: TypeEditorState = {
  fetching: false,
  creating: false,
  mode: TypeMode.NotSet,
  selectedType: "",
  selectedNode: {} as CreateLibraryType,
  rdsName: "",
  terminalCategory: "",
  terminalColor: "",
  createLibraryType: {
    name: "",
    status: Status.NotSet,
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
  statuses: {},
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
        createLibraryType: {
          ...state.createLibraryType,
          name: "",
          status: Status.NotSet,
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
    case SET_RDS_NAME:
      return {
        ...state,
        rdsName: action.payload.rdsName,
      };
    case CHANGE_TERMINAL_CATEGORY:
      return {
        ...state,
        terminalCategory: action.payload.terminalCategory,
      };
    case CHANGE_TERMINAL_COLOR:
      return {
        ...state,
        terminalColor: action.payload.terminalColor,
      };
    case CHANGE_ASPECT:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          aspect: action.payload.aspect,
        },
      };
    case CHANGE_OBJECT_TYPE:
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
    case SET_RDS:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          rdsId: action.payload.rds,
        },
      };
    case CHANGE_TERMINAL_TYPE_ID:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypeId: action.payload.terminalTypeId,
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
    case CHANGE_LOCATION_TYPE:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          locationType: action.payload.locationType,
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

    case REMOVE_TERMINALTYPES:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          terminalTypes: [],
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

    case UPDATE_PREDEFINED_ATTRIBUTES:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          predefinedAttributes: action.payload.predefinedAttributes,
        },
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

    case CHANGE_SYMBOL:
      return {
        ...state,
        createLibraryType: {
          ...state.createLibraryType,
          symbolId: action.payload.symbolId,
        },
      };

    default:
      return state;
  }
}
