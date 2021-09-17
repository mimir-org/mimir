import {
  TerminalTypeItem,
  Aspect,
  ObjectType,
  CreateLibraryType,
  PredefinedAttribute,
  LibraryFilter,
} from "../../../models";
import {
  FETCHING_INITIAL_DATA,
  FETCHING_RDS,
  FETCHING_TERMINALS,
  FETCHING_ATTRIBUTES,
  FETCHING_LOCATIONTYPES,
  FETCHING_PREDEFINED_ATTRIBUTES,
  FETCHING_TYPE,
  FETCHING_BLOB_DATA,
  CLOSE_TYPE_EDITOR,
  UPDATE_CREATELIBRARYTYPE,
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
  DELETE_TYPE_EDITOR_ERROR,
  OPEN_TYPE_EDITOR,
  TypeEditorActionTypes,
} from "./types";

export function getInitialData(): TypeEditorActionTypes {
  return {
    type: FETCHING_INITIAL_DATA,
    payload: null,
  };
}

export function getRDS(aspect: Aspect): TypeEditorActionTypes {
  return {
    type: FETCHING_RDS,
    payload: {
      aspect,
    },
  };
}

export function getTerminals(): TypeEditorActionTypes {
  return {
    type: FETCHING_TERMINALS,
    payload: null,
  };
}

export function getAttributes(aspect: Aspect): TypeEditorActionTypes {
  return {
    type: FETCHING_ATTRIBUTES,
    payload: {
      aspect,
    },
  };
}

export function getLocationTypes(): TypeEditorActionTypes {
  return {
    type: FETCHING_LOCATIONTYPES,
    payload: null,
  };
}

export function getPredefinedAttributes(): TypeEditorActionTypes {
  return {
    type: FETCHING_PREDEFINED_ATTRIBUTES,
    payload: null,
  };
}

export function getSelectedNode(
  selectedType: string,
  libraryFilter: LibraryFilter
): TypeEditorActionTypes {
  return {
    type: FETCHING_TYPE,
    payload: {
      selectedType: selectedType,
      filter: libraryFilter,
    },
  };
}

export function openTypeEditor(): TypeEditorActionTypes {
  return {
    type: OPEN_TYPE_EDITOR,
    payload: null,
  };
}

export function getBlobData(): TypeEditorActionTypes {
  return {
    type: FETCHING_BLOB_DATA,
    payload: null,
  };
}

export function closeTypeEditor() {
  return {
    type: CLOSE_TYPE_EDITOR,
    payload: null,
  };
}

export function updateValue(key: string, value: any) {
  return {
    type: UPDATE_CREATELIBRARYTYPE,
    payload: {
      key: key,
      value: value,
    },
  };
}

export function chooseObjectType(objectType: ObjectType) {
  return {
    type: CHOOSE_OBJECT_TYPE,
    payload: {
      objectType,
    },
  };
}

export function chooseTypeName(typeName: string) {
  return {
    type: CHOOSE_TYPENAME,
    payload: {
      typeName,
    },
  };
}

export function chooseSymbol(symbolId: string): TypeEditorActionTypes {
  return {
    type: CHOOSE_SYMBOL,
    payload: {
      symbolId: symbolId,
    },
  };
}

export function chooseRDS(rds: string) {
  return {
    type: CHOOSE_RDS,
    payload: {
      rds,
    },
  };
}

export function chooseRDSName(rdsName: string) {
  return {
    type: CHOOSE_RDS_NAME,
    payload: {
      rdsName,
    },
  };
}

export function chooseTerminalName(terminalName: string) {
  return {
    type: CHOOSE_TERMINAL_NAME,
    payload: {
      terminalName,
    },
  };
}

export function chooseTerminalCategory(terminalCategory: string) {
  return {
    type: CHOOSE_TERMINAL_CATEGORY,
    payload: {
      terminalCategory,
    },
  };
}

export function chooseTerminalColor(terminalColor: string) {
  return {
    type: CHOOSE_TERMINAL_COLOR,
    payload: {
      terminalColor,
    },
  };
}

export function chooseSemanticReference(semanticReference: string) {
  return {
    type: CHOOSE_SEMANTICREFERENCE,
    payload: {
      semanticReference,
    },
  };
}

export function chooseLocationType(locationType: string) {
  return {
    type: CHOOSE_LOCATION_TYPE,
    payload: {
      locationType,
    },
  };
}

export function chooseTerminalTypeId(terminalTypeId: string) {
  return {
    type: CHOOSE_TERMINAL_TYPE_ID,
    payload: {
      terminalTypeId,
    },
  };
}

export function choosePredefinedAttributes(
  predefinedAttributes: PredefinedAttribute[]
) {
  return {
    type: CHOOSE_PREDEFINED_ATTRIBUTES,
    payload: {
      predefinedAttributes,
    },
  };
}

export function addTerminalType(terminal: TerminalTypeItem) {
  return {
    type: CHOOSE_TERMINALTYPE,
    payload: {
      terminal,
    },
  };
}

export function removeTerminalType(terminal: TerminalTypeItem) {
  return {
    type: REMOVE_TERMINALTYPE,
    payload: {
      terminal,
    },
  };
}

export function updateTerminalType(terminal: TerminalTypeItem) {
  return {
    type: UPDATE_TERMINALTYPE,
    payload: {
      terminal,
    },
  };
}

export function chooseAttributeTypes(attributeTypes: string[]) {
  return {
    type: CHOOSE_ATTRIBUTETYPES,
    payload: {
      attributeTypes,
    },
  };
}

export function saveLibraryType(
  libraryType: CreateLibraryType
): TypeEditorActionTypes {
  return {
    type: SAVE_LIBRARY_TYPE,
    payload: {
      libraryType,
    },
  };
}

export function deleteTypeEditorError(key: string) {
  return {
    type: DELETE_TYPE_EDITOR_ERROR,
    payload: {
      key,
    },
  };
}
