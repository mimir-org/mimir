import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/actions";
import { get } from "../../../../../../redux/store/project/actions";
import { MENU_TYPE } from "../../../../../../models/project";

const OnNoSaveClick = (dispatch: any, projectId: string) => {
  dispatch(get(projectId));
  dispatch(changeActiveMenu(MENU_TYPE.PROJECT_MENU));
  dispatch(setProjectMenuVisibility(false));
};

export default OnNoSaveClick;
