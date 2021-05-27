import { CHANGE_INSPECTOR_COMPONENT } from "./types";

export function changeInspectorTab(type: string) {
  return {
    type: CHANGE_INSPECTOR_COMPONENT,
    payload: { type },
  };
}
