import { Dispatch } from "redux";
import { ToggleColorProfile } from "../../../../helpers/ToggleColorProfile";
// import { toggleDarkMode } from "../../../../redux/store/darkMode/darkModeSlice";
import { msalInstance } from "../../../../index";

export const OnLogOutClick = () => {
  msalInstance.logoutRedirect();
};

export const OnToggleDarkMode = (dispatch: Dispatch, isDarkMode: boolean) => {
  // dispatch(toggleDarkMode());
  ToggleColorProfile(!isDarkMode);
};
