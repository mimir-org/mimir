import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import { importLibrary } from "../../../../redux/store/library/actions";
import { CreateLibraryType } from "../../../../models";

const OnSaveClick = (dispatch: any, data: () => CreateLibraryType[]) => {
  const libraryTypes = data();
  dispatch(importLibrary(libraryTypes));
  dispatch(changeMenu(MENU_TYPE.IMPORT_LIBRARY_FILE_MENU, false));
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
};

export default OnSaveClick;
