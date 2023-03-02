import { AnyAction, Dispatch } from "redux";
import { MENU_TYPE } from "../../../../lib/models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnImportProjectFile = (dispatch: React.Dispatch<AnyAction>) => {
  dispatch(changeActiveMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU));
};
