export const CHANGE_INSPECTOR_COMPONENT = "CHANGE_INSPECTOR_COMPONENT";

export interface ChangeInspectorComponentAction {
  type: typeof CHANGE_INSPECTOR_COMPONENT;
  payload: string;
}
