export const CHANGE_ZOOM_LEVEL = "CHANGE_ZOOM_LEVEL";

export interface ChangeZoomLevel {
  type: typeof CHANGE_ZOOM_LEVEL;
  payload: {
    level: number;
  };
}
