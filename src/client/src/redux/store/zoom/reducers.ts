import { Size } from "../../../compLibrary/size";
import { CHANGE_ZOOM_LEVEL, ChangeZoomLevel } from "./types";

const initialState = {
  level: Size.DEFAULT_ZOOM_LEVEL,
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
