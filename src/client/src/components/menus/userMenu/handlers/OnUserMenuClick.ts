import { Dispatch } from "redux";
import { msalInstance } from "../../../../index";

export const OnLogOutClick = () => {
  msalInstance.logoutRedirect();
};

export const OnToggleDarkMode = (dispatch: Dispatch, isDarkMode: boolean) => {
  // dispatch(toggleDarkMode());
  // ToggleColorProfile(!isDarkMode);
  alert("This needs to be reimplemented");
};
