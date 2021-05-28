export const CHANGE_INSPECTOR_COMPONENT = "CHANGE_INSPECTOR_COMPONENT";

export interface ChangeInspectorTab {
  type: typeof CHANGE_INSPECTOR_COMPONENT;
  payload: { type: string };
}
