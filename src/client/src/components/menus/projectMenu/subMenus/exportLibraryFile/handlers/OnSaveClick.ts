import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { exportLibrary } from "../../../../../../redux/store/library/librarySlice";

const OnSaveClick = (dispatch: any, fileName: string) => {
  dispatch(exportLibrary(fileName));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSaveClick;
