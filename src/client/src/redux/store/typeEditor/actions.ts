import {
  TerminalTypeItem,
  Aspect,
  CreateLibraryType,
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
  FETCHING_COMPOSITE_TYPES,
  OPEN_TYPE_EDITOR,
  CLOSE_TYPE_EDITOR,
  UPDATE_CREATELIBRARYTYPE,
  ADD_TERMINALTYPE,
  REMOVE_TERMINALTYPE,
  UPDATE_TERMINALTYPE,
  SAVE_LIBRARY_TYPE,
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

export function getCompositeTypes(): TypeEditorActionTypes {
  return {
    type: FETCHING_COMPOSITE_TYPES,
    payload: null,
  };
}

export function openTypeEditor(): TypeEditorActionTypes {
  return {
    type: OPEN_TYPE_EDITOR,
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

export function addTerminalType(terminal: TerminalTypeItem) {
  return {
    type: ADD_TERMINALTYPE,
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
