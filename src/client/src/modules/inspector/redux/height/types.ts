export const CHANGE_INSPECTOR_HEIGHT = "CHANGE_INSPECTOR_HEIGHT";

export interface ChangeInspectorHeight {
  type: typeof CHANGE_INSPECTOR_HEIGHT;
  payload: { height: number };
}

export type InspectorHeightActionTypes = ChangeInspectorHeight;
