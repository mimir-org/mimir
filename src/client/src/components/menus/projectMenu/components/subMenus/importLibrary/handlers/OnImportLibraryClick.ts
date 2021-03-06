import { changeActiveMenu } from "../../redux/menuSlice";
import { importLibrary } from "../../../../../../../redux/store/library/librarySlice";
import { Dispatch } from "redux";

const OnImportLibraryClick = (clear: () => void, dispatch: Dispatch, libraryTypeFile: File) => {
  dispatch(importLibrary(libraryTypeFile));
  dispatch(changeActiveMenu(null));
  clear();
};

export default OnImportLibraryClick;
