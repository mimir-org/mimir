import { INSPECTOR_TOGGLE_CHANGED_COMPLETED } from "../reducers/showInspectorReducer";

export function changeToggleInspector(visible: boolean) {
  return {
    type: INSPECTOR_TOGGLE_CHANGED_COMPLETED,
    payload: !visible,
  };
}
