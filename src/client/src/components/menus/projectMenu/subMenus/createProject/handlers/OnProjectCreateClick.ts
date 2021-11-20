import { changeActiveMenu, setProjectMenuVisibility } from "../../../../projectMenu/subMenus/redux/actions";
import { create } from "../../../../../../redux/store/project/actions";

const OnProjectCreateClick = (dispatch: any, projectName: string) => {
  dispatch(create(projectName, projectName));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnProjectCreateClick;
