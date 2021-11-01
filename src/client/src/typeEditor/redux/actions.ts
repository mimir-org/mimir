import * as Types from "./types";
import { TerminalTypeItem, Aspect, CreateLibraryType, LibraryFilter } from "../../models";

export function getInitialData(): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_INITIAL_DATA,
    payload: null,
  };
}

export function getRDS(aspect: Aspect): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_RDS,
    payload: {
      aspect,
    },
  };
}

export function getTerminals(): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_TERMINALS,
    payload: null,
  };
}

export function getAttributes(aspect: Aspect): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_ATTRIBUTES,
    payload: {
      aspect,
    },
  };
}

export function getLocationTypes(): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_LOCATIONTYPES,
    payload: null,
  };
}

export function getPredefinedAttributes(): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_PREDEFINED_ATTRIBUTES,
    payload: null,
  };
}

export function getSelectedNode(selectedType: string, libraryFilter: LibraryFilter): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_TYPE,
    payload: {
      selectedType: selectedType,
      filter: libraryFilter,
    },
  };
}

export function getBlobData(): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_BLOB_DATA,
    payload: null,
  };
}

export function getSimpleTypes(): Types.TypeEditorActionTypes {
  return {
    type: Types.FETCHING_SIMPLE_TYPES,
    payload: null,
  };
}

export function openTypeEditor(): Types.TypeEditorActionTypes {
  return {
    type: Types.OPEN_TYPE_EDITOR,
    payload: null,
  };
}

export function closeTypeEditor() {
  return {
    type: Types.CLOSE_TYPE_EDITOR,
    payload: null,
  };
}

export function updateValue(key: string, value: any) {
  return {
    type: Types.UPDATE_CREATELIBRARYTYPE,
    payload: {
      key: key,
      value: value,
    },
  };
}

export function addTerminalType(terminal: TerminalTypeItem) {
  return {
    type: Types.ADD_TERMINALTYPE,
    payload: {
      terminal,
    },
  };
}

export function removeTerminalType(terminal: TerminalTypeItem) {
  return {
    type: Types.REMOVE_TERMINALTYPE,
    payload: {
      terminal,
    },
  };
}

export function removeTerminalTypeByCategory(categoryId: string) {
  return {
    type: Types.REMOVE_TERMINALTYPE_BY_CATEGORY,
    payload: {
      categoryId,
    },
  };
}

export function updateTerminalType(terminal: TerminalTypeItem) {
  return {
    type: Types.UPDATE_TERMINALTYPE,
    payload: {
      terminal,
    },
  };
}

export function saveLibraryType(libraryType: CreateLibraryType): Types.TypeEditorActionTypes {
  return {
    type: Types.SAVE_LIBRARY_TYPE,
    payload: {
      libraryType,
    },
  };
}

export function deleteTypeEditorError(key: string) {
  return {
    type: Types.DELETE_TYPE_EDITOR_ERROR,
    payload: {
      key,
    },
  };
}

export function changeTypeEditorInspectorHeight(height: number) {
  return {
    type: Types.CHANGE_TYPE_EDITOR_INSPECTOR_HEIGHT,
    payload: { height },
  };
}

export function changeTypeEditorInspectorVisibility(visibility: boolean) {
  return {
    type: Types.CHANGE_TYPE_EDITOR_INSPECTOR_VISIBILITY,
    payload: { visibility },
  };
}

export function changeTypeEditorInspectorTab(index: number) {
  return {
    type: Types.CHANGE_TYPE_EDITOR_INSPECTOR_TAB,
    payload: { index },
  };
}
