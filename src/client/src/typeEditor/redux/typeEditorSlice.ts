import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Size } from "../../compLibrary/size";
import { ApiError } from "../../models/webclient";
import {
  FetchingBlobDataActionFinished,
  FetchingSimpleTypesActionFinished,
  FetchingTypeAction,
  TypeEditorState,
  UpdateCreateLibraryType
} from "./types";
import {
  Aspect,
  AttributeType,
  BlobData,
  CreateLibraryType,
  LocationType,
  ObjectType,
  PredefinedAttribute,
  Purpose,
  Rds,
  TerminalTypeDictItem,
  TerminalTypeItem
} from "../../models";

const initialState: TypeEditorState = {
  visible: false,
  fetching: false,
  creating: false,
  validationVisibility: false,
  createLibraryType: {
    id: null,
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
    simpleTypes: [] as string[],
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
  inspector: {
    visibility: false,
    height: Size.ModuleClosed,
    activeTabIndex: null,
  },
};

export const typeEditorSlice = createSlice({
  name: 'typeEditor',
  initialState,
  reducers: {
    fetchingInitialData: (state) => {
      state.fetching = true;
    },
    fetchingInitialDataSuccessOrError: (state, action: PayloadAction<Purpose[]>) => {
      state.fetching = false;
      state.purposes = action.payload;
    },
    fetchingRds: (state) => {
      state.fetching = true;
    },
    fetchingRdsSuccessOrError: (state, action: PayloadAction<Rds[]>) => {
      state.fetching = false;
      state.rdsList = action.payload ? action.payload : [];
    },
    fetchingTerminals: (state) => {
      state.fetching = true;
    },
    fetchingTerminalsSuccessOrError: (state, action: PayloadAction<TerminalTypeDictItem[]>) => {
      state.fetching = false;
      state.terminals = action.payload;
    },
    fetchingAttributes: (state) => {
      state.fetching = true;
    },
    fetchingAttributesSuccessOrError: (state, action: PayloadAction<AttributeType[]>) => {
      state.fetching = false;
      state.attributes = action.payload ? action.payload : [];
    },
    fetchingLocationTypes: (state) => {
      state.fetching = true;
    },
    fetchingLocationTypesSuccessOrError: (state, action: PayloadAction<LocationType[]>) => {
      state.fetching = false;
      state.locationTypes = action.payload;
    },
    fetchingPredefinedAttributes: (state) => {
      state.fetching = true;
    },
    fetchingPredefinedAttributesSuccessOrError: (state, action: PayloadAction<PredefinedAttribute[]>) => {
      state.fetching = false;
      state.predefinedAttributes = action.payload;
    },
    fetchingType: (state, action: PayloadAction<FetchingTypeAction>) => {
      state.fetching = true;
      state.visible = false;
      state.createLibraryType = {...initialState.createLibraryType};
    },
    fetchingTypeSuccessOrError: (state, action: PayloadAction<CreateLibraryType>) => {
      state.fetching = false;
      state.visible = true;
      state.createLibraryType = new CreateLibraryType(action.payload)
      state.inspector.visibility = false;
      state.inspector.height = Size.ModuleClosed;
      state.inspector.activeTabIndex = null;
    },
    fetchingBlobData: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchingBlobDataSuccessOrError.type)
        : state.apiError
    },
    fetchingBlobDataSuccessOrError: (state, action: PayloadAction<FetchingBlobDataActionFinished>) => {
      state.fetching = false;
      state.icons = action.payload.icons;
      state.apiError = action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError;
    },
    fetchingSimpleTypes: (state) => {
      state.fetching = true;
      state.apiError = state.apiError
        ? state.apiError.filter((elem) => elem.key !== fetchingSimpleTypesSuccessOrError.type)
        : state.apiError
    },
    fetchingSimpleTypesSuccessOrError: (state, action: PayloadAction<FetchingSimpleTypesActionFinished>) => {
      state.fetching = false;
      state.simpleTypes = action.payload.simpleTypes;
      state.apiError = action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError;
    },
    updateCreateLibraryType: (state, action: PayloadAction<UpdateCreateLibraryType>) => {
      state.createLibraryType = {
        ...state.createLibraryType,
        [action.payload.key]: action.payload.value
      };
    },
    addTerminalType: (state, action: PayloadAction<TerminalTypeItem>) => {
      state.createLibraryType = {
        ...state.createLibraryType,
        terminalTypes: [...state.createLibraryType.terminalTypes, action.payload]
      };
    },
    removeTerminalType: (state, action: PayloadAction<TerminalTypeItem>) => {
      state.createLibraryType = {
        ...state.createLibraryType,
        terminalTypes: state.createLibraryType.terminalTypes.filter((terminal) => terminal.terminalId !== action.payload.terminalId)
      };
    },
    updateTerminalType: (state, action: PayloadAction<TerminalTypeItem>) => {
      state.createLibraryType = {
        ...state.createLibraryType,
        terminalTypes: state.createLibraryType.terminalTypes.map((terminal) => terminal.terminalId === action.payload.terminalId ? action.payload : terminal)
      };
    },
    removeTerminalTypeByCategory: (state, action: PayloadAction<string>) => {
      state.createLibraryType = {
        ...state.createLibraryType,
        terminalTypes: state.createLibraryType.terminalTypes.filter((terminal) => terminal.categoryId !== action.payload)
      };
    },
    clearAllTerminalTypes: (state) => {
      state.createLibraryType.terminalTypes = [];
    },
    saveLibraryType: (state, action: PayloadAction<CreateLibraryType>) => {
      state.fetching = true;
      state.apiError = state.apiError ? state.apiError.filter((elem) => elem.key !== saveLibraryType.type) : state.apiError;
    },
    saveLibraryTypeSuccessOrError: (state, action: PayloadAction<ApiError>) => {
      state.fetching = false;
      state.apiError = action.payload ? [...state.apiError, action.payload] : state.apiError;
      state.createLibraryType = {...initialState.createLibraryType};
      state.inspector = {...initialState.inspector};
    },
    deleteTypeEditorError: (state, action: PayloadAction<string>) => {
      state.apiError = state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload) : state.apiError;
    },
    changeTypeEditorVisibility: (state, action: PayloadAction<boolean>) => {
      state.fetching = false;
      state.visible = action.payload;
      state.createLibraryType = {...initialState.createLibraryType};
      state.inspector = {...initialState.inspector};
    },
    changeTypeEditorValidationVisibility: (state, action: PayloadAction<boolean>) => {
      state.validationVisibility = action.payload;
    },
    changeTypeEditorInspectorHeight: (state, action: PayloadAction<number>) => {
      state.inspector.height = action.payload;
    },
    changeTypeEditorInspectorVisibility: (state, action: PayloadAction<boolean>) => {
      state.inspector.visibility = action.payload;
    },
    changeTypeEditorInspectorTab: (state, action: PayloadAction<number>) => {
      state.inspector.activeTabIndex = action.payload;
    }
  }
})

export const {
  fetchingInitialData,
  fetchingInitialDataSuccessOrError,
  fetchingRds,
  fetchingRdsSuccessOrError,
  fetchingTerminals,
  fetchingTerminalsSuccessOrError,
  fetchingAttributes,
  fetchingAttributesSuccessOrError,
  fetchingLocationTypes,
  fetchingLocationTypesSuccessOrError,
  fetchingPredefinedAttributes,
  fetchingPredefinedAttributesSuccessOrError,
  fetchingType,
  fetchingTypeSuccessOrError,
  fetchingBlobData,
  fetchingBlobDataSuccessOrError,
  fetchingSimpleTypes,
  fetchingSimpleTypesSuccessOrError,
  updateCreateLibraryType,
  addTerminalType,
  removeTerminalType,
  updateTerminalType,
  removeTerminalTypeByCategory,
  clearAllTerminalTypes,
  saveLibraryType,
  saveLibraryTypeSuccessOrError,
  deleteTypeEditorError,
  changeTypeEditorVisibility,
  changeTypeEditorValidationVisibility,
  changeTypeEditorInspectorHeight,
  changeTypeEditorInspectorVisibility,
  changeTypeEditorInspectorTab
} = typeEditorSlice.actions;

export default typeEditorSlice.reducer