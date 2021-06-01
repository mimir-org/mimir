import { CHANGE_INSPECTOR_COMPONENT } from "./types";

export function changeInspectorTab(index: number) {
  return {
    type: CHANGE_INSPECTOR_COMPONENT,
    payload: { index },
  };
}
