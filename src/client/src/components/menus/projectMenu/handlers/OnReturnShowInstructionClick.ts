import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";

export const OnReturnShowInstructionClick = (isStartPage: boolean, dispatch: Dispatch) => {
  const newActiveMenu = isStartPage ? MENU_TYPE.INSTRUCTION_PROJECT_MENU : null;
  dispatch(changeActiveMenu(newActiveMenu));
};
