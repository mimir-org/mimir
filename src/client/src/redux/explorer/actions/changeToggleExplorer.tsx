import { EXPLORER_TOGGLE_CHANGED_COMPLETED } from "../reducers/showExplorerReducer";

export function changeToggleExplorer(visible: boolean) {
  return {
    type: EXPLORER_TOGGLE_CHANGED_COMPLETED,
    payload: !visible,
  };
}
