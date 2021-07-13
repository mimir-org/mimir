export const SET_DARK_MODE = "SET_DARK_MODE";

export interface SetDarkMode {
  type: typeof SET_DARK_MODE;
  payload: {
    active: boolean;
  };
}

export type DarkModeActionTypes = SetDarkMode;
