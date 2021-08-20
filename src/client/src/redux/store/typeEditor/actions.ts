import {
  TypeMode,
  TerminalTypeItem,
  Aspect,
  ObjectType,
  CreateLibraryType,
  UpdateLibraryType,
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
  CHANGE_SELECTED_TYPE,
  CHANGE_MODE,
  CHOOSE_ASPECT,
  CHOOSE_OBJECT_TYPE,
  CHOOSE_TYPENAME,
  CHOOSE_SYMBOL,
  CHOOSE_RDS,
  CHOOSE_RDS_NAME,
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
  UPDATING_TYPE,
  DELETE_TYPE_EDITOR_ERROR,
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

export function getBlobData(): TypeEditorActionTypes {
  return {
    type: FETCHING_BLOB_DATA,
    payload: null,
  };
}

export function changeSelectedType(selectedType: string) {
  return {
    type: CHANGE_SELECTED_TYPE,
    payload: {
      selectedType,
    },
  };
}

export function changeMode(mode: TypeMode) {
  return {
    type: CHANGE_MODE,
    payload: {
      mode,
    },
  };
}

export function chooseAspect(mode: TypeMode, aspect: Aspect) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_ASPECT,
      payload: {
        aspect,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_ASPECT,
      payload: {
        aspect,
      },
    };
}

export function chooseObjectType(mode: TypeMode, objectType: ObjectType) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_OBJECT_TYPE,
      payload: {
        objectType,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_OBJECT_TYPE,
      payload: {
        objectType,
      },
    };
}

export function chooseTypeName(mode: TypeMode, typeName: string) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_TYPENAME,
      payload: {
        typeName,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_TYPENAME,
      payload: {
        typeName,
      },
    };
}

export function chooseSymbol(
  mode: TypeMode,
  symbolId: string
): TypeEditorActionTypes {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_SYMBOL,
      payload: {
        symbolId: symbolId,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_SYMBOL,
      payload: {
        symbolId: symbolId,
      },
    };
}

export function chooseRDS(mode: TypeMode, rds: string) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_RDS,
      payload: {
        rds,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_RDS,
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

export function chooseSemanticReference(
  mode: TypeMode,
  semanticReference: string
) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_SEMANTICREFERENCE,
      payload: {
        semanticReference,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_SEMANTICREFERENCE,
      payload: {
        semanticReference,
      },
    };
}

export function chooseLocationType(mode: TypeMode, locationType: string) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_LOCATION_TYPE,
      payload: {
        locationType,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_LOCATION_TYPE,
      payload: {
        locationType,
      },
    };
}

export function chooseTerminalTypeId(mode: TypeMode, terminalTypeId: string) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_TERMINAL_TYPE_ID,
      payload: {
        terminalTypeId,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_TERMINAL_TYPE_ID,
      payload: {
        terminalTypeId,
      },
    };
}

export function choosePredefinedAttributes(
  mode: TypeMode,
  predefinedAttributes: PredefinedAttribute[]
) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_PREDEFINED_ATTRIBUTES,
      payload: {
        predefinedAttributes,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_PREDEFINED_ATTRIBUTES,
      payload: {
        predefinedAttributes,
      },
    };
}

export function chooseTerminalType(mode: TypeMode, terminal: TerminalTypeItem) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_TERMINALTYPE,
      payload: {
        terminal,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_TERMINALTYPE,
      payload: {
        terminal,
      },
    };
}

export function chooseAttributeTypes(mode: TypeMode, attributeTypes: string[]) {
  if (mode === TypeMode.New)
    return {
      type: CHOOSE_ATTRIBUTETYPES,
      payload: {
        attributeTypes,
      },
    };
  if (mode === TypeMode.Edit)
    return {
      type: CHANGE_ATTRIBUTETYPES,
      payload: {
        attributeTypes,
      },
    };
}

export function removeTerminalTypes() {
  return {
    type: REMOVE_TERMINALTYPES,
    payload: {},
  };
}

export function create(libraryType: CreateLibraryType): TypeEditorActionTypes {
  return {
    type: CREATING_TYPE,
    payload: {
      libraryType,
    },
  };
}

export function update(
  selectedType: string,
  libraryType: UpdateLibraryType
): TypeEditorActionTypes {
  return {
    type: UPDATING_TYPE,
    payload: {
      selectedType,
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
