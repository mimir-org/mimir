import {
  CHANGE_EXPLORER_VISIBILITY,
  CHANGE_INSPECTOR_VISIBILITY,
  CHANGE_LIBRARY_VISIBILITY,
} from "./types";

export function ChangeExplorerVisibility() {
  return {
    type: CHANGE_EXPLORER_VISIBILITY,
  };
}

export function ChangeInspectorVisibility() {
  return {
    type: CHANGE_INSPECTOR_VISIBILITY,
  };
}

export function ChangeLibraryVisibility() {
  return {
    type: CHANGE_LIBRARY_VISIBILITY,
  };
}
