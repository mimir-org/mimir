import { CHANGE_ZOOM_LEVEL, ChangeZoomLevelTypes } from "./types";

const initialState = {
  level: 0.9,
};

export function zoomLevelReducer(state = initialState, action: ChangeZoomLevelTypes) {
  if (action.type === CHANGE_ZOOM_LEVEL) {
    return {
      ...state,
      level: action.payload.level,
    };
  }

  return state;
}
