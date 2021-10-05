import { setDarkMode } from "../../../redux/store/darkMode/actions";
import { SetDarkModeColor } from "../../flow/helpers";

const OnDarkMode = (dispatch: any, darkMode: boolean) => {
  dispatch(setDarkMode(!darkMode));
  SetDarkModeColor(!darkMode);
};

export default OnDarkMode;
