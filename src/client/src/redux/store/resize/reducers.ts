import { START_RESIZE, STOP_RESIZE, ResizeActionTypes } from "./types";

const initialState = {
  resizing: false,
};

export function resizeReducer(state = initialState, action: ResizeActionTypes) {
  switch (action.type) {
    case START_RESIZE:
      return {
        ...state,
        resizing: true,
      };
    case STOP_RESIZE:
      return {
        ...state,
        resizing: false,
      };
    default:
      return state;
  }
}
