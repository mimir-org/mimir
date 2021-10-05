import { changeActiveMenu, setAccountMenuVisibility } from "../../../../redux/store/projectMenu/actions";
import { importLibrary } from "../../../../redux/store/library/actions";
import { CreateLibraryType } from "../../../../models";

const OnSaveClick = (dispatch: any, data: () => CreateLibraryType[]) => {
  const libraryTypes = data();
  dispatch(importLibrary(libraryTypes));
  dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(false));
};

export default OnSaveClick;
