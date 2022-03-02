import { changeActiveMenu } from "../../redux/menuSlice";
import { importLibrary } from "../../../../../../../redux/store/library/librarySlice";
import { CreateLibraryType } from "../../../../../../../models";
import { Dispatch } from "redux";

const OnSaveClick = (dispatch: Dispatch, data: () => CreateLibraryType[]) => {
  const libraryTypes = data();
  dispatch(importLibrary(libraryTypes));
  dispatch(changeActiveMenu(null));
};

export default OnSaveClick;
