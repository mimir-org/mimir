import { CHANGE_INSPECTOR_COMPONENT } from "./types";

export function changeInspectorTab(index: number, type: string) {
  return {
    type: CHANGE_INSPECTOR_COMPONENT,
    payload: { index, type },
  };
}
