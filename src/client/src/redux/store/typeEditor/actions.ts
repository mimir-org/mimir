import {
  TerminalTypeItem,
  Aspect,
  ObjectType,
  Status,
  CreateLibraryType,
  UpdateLibraryType,
} from "../../../models";
import {
  CREATING_TYPE,
  UPDATING_TYPE,
  CHANGE_MODE,
  FETCHING_INITIAL_DATA,
  FETCHING_RDS,
  FETCHING_TERMINALS,
  FETCHING_ATTRIBUTES,
  CHANGE_ASPECT,
  CHANGE_OBJECTTYPE,
  CHANGE_TYPENAME,
  CHANGE_STATUS,
  CHANGE_RDS,
  CHANGE_RDS_NAME,
  CHANGE_TERMINAL_CATEGORY,
  CHANGE_TERMINAL_COLOR,
  CHANGE_SEMANTICREFERENCE,
  UPDATE_TERMINALTYPES,
  UPDATE_ATTRIBUTETYPES,
  CHANGE_TERMINAL_TYPE_ID,
  DELETE_TYPE_EDITOR_ERROR,
  TypeEditorActionTypes,
} from "./types";

// TODO create type, save type, get attributes

export function create(libraryType: CreateLibraryType): TypeEditorActionTypes {
  return {
    type: CREATING_TYPE,
    payload: {
      libraryType,
    },
  };
}
export function update(libraryType: UpdateLibraryType): TypeEditorActionTypes {
  return {
    type: UPDATING_TYPE,
    payload: {
      libraryType,
    },
  };
}
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

export function changeMode(mode: string) {
  return {
    type: CHANGE_MODE,
    payload: {
      mode,
    },
  };
}

export function changeSelectedAspect(aspect: Aspect) {
  return {
    type: CHANGE_ASPECT,
    payload: {
      aspect,
    },
  };
}

export function changeSelectedObjecttype(objectType: ObjectType) {
  return {
    type: CHANGE_OBJECTTYPE,
    payload: {
      objectType,
    },
  };
}

export function changeTypeName(typeName: string) {
  return {
    type: CHANGE_TYPENAME,
    payload: {
      typeName,
    },
  };
}

export function changeStatus(status: Status) {
  return {
    type: CHANGE_STATUS,
    payload: {
      status,
    },
  };
}

export function changeRDS(rds: string) {
  return {
    type: CHANGE_RDS,
    payload: {
      rds,
    },
  };
}

export function changeRDSName(rdsName: string) {
  return {
    type: CHANGE_RDS_NAME,
    payload: {
      rdsName,
    },
  };
}

export function changeTerminalCategory(terminalCategory: string) {
  return {
    type: CHANGE_TERMINAL_CATEGORY,
    payload: {
      terminalCategory,
    },
  };
}

export function changeTerminalColor(terminalColor: string) {
  return {
    type: CHANGE_TERMINAL_COLOR,
    payload: {
      terminalColor,
    },
  };
}

export function changeTerminalTypeId(terminalTypeId: string) {
  return {
    type: CHANGE_TERMINAL_TYPE_ID,
    payload: {
      terminalTypeId,
    },
  };
}

export function changeSemanticReference(semanticReference: string) {
  return {
    type: CHANGE_SEMANTICREFERENCE,
    payload: {
      semanticReference,
    },
  };
}

export function updateTerminalTypes(terminalTypes: TerminalTypeItem[]) {
  return {
    type: UPDATE_TERMINALTYPES,
    payload: {
      terminalTypes,
    },
  };
}

export function updateAttributesList(attributeTypes: string[]) {
  return {
    type: UPDATE_ATTRIBUTETYPES,
    payload: {
      attributeTypes,
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
