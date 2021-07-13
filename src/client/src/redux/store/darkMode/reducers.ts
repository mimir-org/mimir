import { SET_DARK_MODE } from "./types";

const initialState = {
  active: false,
};

export function darkModeReducer(action, state = initialState) {
  if (action.type === SET_DARK_MODE) {
    return {
      ...state,
      active: action.payload.active,
    };
  }
}
