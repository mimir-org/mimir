import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import { get } from "../../../../redux/store/project/actions";

const OnNoSaveClick = (dispatch: any, projectId: string, setConfirm: any) => {
  dispatch(get(projectId));
  setConfirm(false);
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
};

export default OnNoSaveClick;
