import { Dispatch } from "redux";
import { ToggleDarkModeColor } from "../../../../helpers/ToggleDarkModeColor";
import { toggleDarkMode } from "../../../../redux/store/darkMode/darkModeSlice";
import { msalInstance } from "../../../../index";

export const OnLogOutClick = () => {
  msalInstance.logoutRedirect();
};

export const OnToggleDarkMode = (dispatch: Dispatch, isDarkMode: boolean) => {
  dispatch(toggleDarkMode());
  ToggleDarkModeColor(!isDarkMode);
};
