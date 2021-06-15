import { SET_DARK_MODE } from "./types";

export function setDarkMode(active: boolean) {
  return {
    type: SET_DARK_MODE,
    payload: {
      active,
    },
  };
}
