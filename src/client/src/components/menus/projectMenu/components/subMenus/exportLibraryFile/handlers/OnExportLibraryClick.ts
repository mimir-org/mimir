import { changeActiveMenu } from "../../redux/menuSlice";
import { exportLibrary } from "../../../../../../../redux/store/library/librarySlice";
import { Dispatch } from "redux";

const OnExportLibraryClick = (dispatch: Dispatch, fileName: string) => {
  dispatch(exportLibrary(fileName));
  dispatch(changeActiveMenu(null));
};

export default OnExportLibraryClick;
