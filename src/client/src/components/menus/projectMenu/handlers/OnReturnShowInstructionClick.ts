import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";
import { ViewType } from "lib";

export const OnReturnShowInstructionClick = (dispatch: Dispatch, view: ViewType) => {
  const newActiveMenu = view === ViewType.Home ? MENU_TYPE.INSTRUCTION_PROJECT_MENU : null;
  dispatch(changeActiveMenu(newActiveMenu));
};
