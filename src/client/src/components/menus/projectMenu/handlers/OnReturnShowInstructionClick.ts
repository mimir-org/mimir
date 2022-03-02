import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../components/subMenus/redux/menuSlice";
import { IsStartPage } from "../../../../helpers";

export const OnReturnShowInstructionClick = (dispatch: Dispatch) => {
  const newActiveMenu = IsStartPage() ? MENU_TYPE.INSTRUCTION_PROJECT_MENU : null;
  dispatch(changeActiveMenu(newActiveMenu));
};
