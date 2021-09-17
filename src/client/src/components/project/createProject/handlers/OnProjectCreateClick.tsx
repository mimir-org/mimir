import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import { MENU_TYPE } from "../../../../models/project";
import { create } from "../../../../redux/store/project/actions";

const OnProjectCreateClick = (dispatch: any, projectName: string) => {
  dispatch(create(projectName, projectName));
  dispatch(changeMenu(MENU_TYPE.CREATE_PROJECT_MENU, false));
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
};

export default OnProjectCreateClick;
