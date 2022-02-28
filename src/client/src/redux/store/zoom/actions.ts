import { CHANGE_ZOOM_LEVEL } from "./types";

export function changeZoomLevel(level: number) {
  return {
    type: CHANGE_ZOOM_LEVEL,
    payload: {
      level,
    },
  };
}
