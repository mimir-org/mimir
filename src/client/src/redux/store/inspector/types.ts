export const CHANGE_INSPECTOR_COMPONENT = "CHANGE_INSPECTOR_COMPONENT";

// State types
export interface InspectorState {
  nodes: [];
}

// Action types
export interface ChangeInspectorComponentAction {
  type: typeof CHANGE_INSPECTOR_COMPONENT;
  payload: string;
}
