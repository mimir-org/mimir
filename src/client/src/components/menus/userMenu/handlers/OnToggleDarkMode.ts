import { Dispatch } from "redux";
import { ToggleDarkModeColor } from "../../../../helpers";
import { toggleDarkMode } from "../../../../redux/store/darkMode/darkModeSlice";

export const OnToggleDarkMode = (dispatch: Dispatch, isDarkMode: boolean) => {
  dispatch(toggleDarkMode());
  ToggleDarkModeColor(!isDarkMode);
};
