import { DarkModeActionTypes, SET_DARK_MODE } from "./types";

const initialState = {
  active: false,
};

export function darkModeReducer(
  state = initialState,
  action: DarkModeActionTypes
) {
  if (action.type === SET_DARK_MODE) {
    return {
      ...state,
      active: action.payload.active,
    };
  }
  return state;
}
