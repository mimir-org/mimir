import { Dispatch } from "redux";
import { SetDarkModeColor } from "../../../../helpers";
import { toggleDarkMode } from "../../../../redux/store/darkMode/darkModeSlice";

const OnDarkMode = (dispatch: Dispatch, darkMode: boolean) => {
  dispatch(toggleDarkMode());
  SetDarkModeColor(!darkMode);
};

export default OnDarkMode;
