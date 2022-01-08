import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { importLibrary } from "../../../../../../redux/store/library/librarySlice";
import { CreateLibraryType } from "../../../../../../models";

const OnSaveClick = (dispatch: any, data: () => CreateLibraryType[]) => {
  const libraryTypes = data();
  dispatch(importLibrary(libraryTypes));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSaveClick;
