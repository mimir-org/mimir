import { setDarkMode } from "../../../redux/store/darkMode/actions";
import { SetDarkModeColor } from "../../flow/helpers/common";

const OnDarkModeClick = (dispatch: any, darkMode: boolean) => {
  dispatch(setDarkMode(!darkMode));
  SetDarkModeColor(!darkMode);
};

export default OnDarkModeClick;
