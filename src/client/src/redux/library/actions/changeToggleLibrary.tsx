import { LIBRARY_TOGGLE_CHANGED_COMPLETED } from "../reducers/showLibraryReducer";

export function changeToggleLibrary(visible: boolean) {
  return {
    type: LIBRARY_TOGGLE_CHANGED_COMPLETED,
    payload: !visible,
  };
}
