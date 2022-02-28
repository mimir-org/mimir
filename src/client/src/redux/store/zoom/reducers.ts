import { CHANGE_ZOOM_LEVEL, ChangeZoomLevel } from "./types";

const initialState = {
  level: 0.9,
};

export function zoomLevelReducer(state = initialState, action: ChangeZoomLevel) {
  if (action.type === CHANGE_ZOOM_LEVEL) {
    return {
      ...state,
      level: action.payload.level,
    };
  }

  return state;
}
