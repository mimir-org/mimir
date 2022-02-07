import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { exportLibrary } from "../../../../../../redux/store/library/librarySlice";
import { Dispatch } from "redux";

const OnSaveClick = (dispatch: Dispatch, fileName: string) => {
  dispatch(exportLibrary(fileName));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSaveClick;
