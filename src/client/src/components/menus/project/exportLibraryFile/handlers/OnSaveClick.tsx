import { changeActiveMenu, setProjectMenuVisibility } from "../../../project/redux/actions";
import { exportLibrary } from "../../../../../redux/store/library/actions";

const OnSaveClick = (dispatch: any, fileName: string) => {
  dispatch(exportLibrary(fileName));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSaveClick;
