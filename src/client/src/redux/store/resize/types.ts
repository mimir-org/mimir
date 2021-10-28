export const START_RESIZE = "START_RESIZE";
export const STOP_RESIZE = "STOP_RESIZE";

export interface StartResize {
  type: typeof START_RESIZE;
  payload: null;
}

export interface StopResize {
  type: typeof STOP_RESIZE;
  payload: null;
}

export type ResizeActionTypes = StartResize | StopResize;
