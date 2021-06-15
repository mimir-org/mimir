import { SET_DARK_MODE } from "./types";

const initialState = {
  active: false,
};

export function darkModeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        ...state,
        active: action.payload.active,
      };
    default:
      return state;
  }
}
