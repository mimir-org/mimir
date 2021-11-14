import { Dispatch } from "redux";
import { MENU_TYPE } from "../../../../models/project";
import { changeActiveMenu } from "../../project/redux/actions";

export const OnCreateSubprojectClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.CREATE_SUB_PROJECT_MENU));
};
