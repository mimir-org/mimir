import { SetDarkModeColor } from "../../../helpers";
import { setDarkMode } from "../../../redux/store/darkMode/actions";

const OnDarkMode = (dispatch: any, darkMode: boolean) => {
  dispatch(setDarkMode(!darkMode));
  SetDarkModeColor(!darkMode);
};

export default OnDarkMode;
