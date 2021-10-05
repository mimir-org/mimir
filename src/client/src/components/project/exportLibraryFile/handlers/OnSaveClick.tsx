import { changeActiveMenu, setAccountMenuVisibility } from "../../../../redux/store/projectMenu/actions";
import { exportLibrary } from "../../../../redux/store/library/actions";

const OnSaveClick = (dispatch: any, fileName: string) => {
  dispatch(exportLibrary(fileName));
  dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(false));
};

export default OnSaveClick;
