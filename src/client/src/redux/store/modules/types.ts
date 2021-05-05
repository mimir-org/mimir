export const CHANGE_LIBRARY_VISIBILITY = "CHANGE_LIBRARY_VISIBILITY";
export const CHANGE_EXPLORER_VISIBILITY = "CHANGE_EXPLORER_VISIBILITY";
export const CHANGE_INSPECTOR_VISIBILITY = "CHANGE_INSPECTOR_VISIBILITY";

export interface ChangeLibraryVisibilty {
  type: typeof CHANGE_LIBRARY_VISIBILITY;
  payload: string;
}
export interface ChangeExplorerVisibilty {
  type: typeof CHANGE_EXPLORER_VISIBILITY;
  payload: string;
}
export interface ChangeInspectorVisibilty {
  type: typeof CHANGE_INSPECTOR_VISIBILITY;
  payload: string;
}
