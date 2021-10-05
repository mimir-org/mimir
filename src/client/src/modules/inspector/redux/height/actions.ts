import { CHANGE_INSPECTOR_HEIGHT } from "./types";

export function changeInspectorHeight(height: number) {
  return {
    type: CHANGE_INSPECTOR_HEIGHT,
    payload: { height },
  };
}
