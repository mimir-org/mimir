import { MENU_TYPE } from "../../../models/project";
import { changeMenu } from "../../../redux/store/projectMenu/actions";

const OnAccountClick = (dispatch: any, open: boolean) => {
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, !open));
  dispatch(changeMenu(MENU_TYPE.CREATE_PROJECT_MENU, false));
  dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, false));
};

export default OnAccountClick;
