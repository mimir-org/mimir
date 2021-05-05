import {
  CHANGE_EXPLORER_VISIBILITY,
  CHANGE_INSPECTOR_VISIBILITY,
  CHANGE_LIBRARY_VISIBILITY,
} from "./types";

const initialState = {
  visible: false,
};

export function moduleReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EXPLORER_VISIBILITY:
      return {
        ...state,
        visible: action.payload.visible,
      };
    case CHANGE_INSPECTOR_VISIBILITY:
      return {
        ...state,
        visible: action.payload.visible,
      };
    case CHANGE_LIBRARY_VISIBILITY:
      return {
        ...state,
        visible: action.payload.visible,
      };

    default:
      return state;
  }
}
