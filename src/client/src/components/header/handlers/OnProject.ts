import { Dispatch } from "redux";
import { changeActiveMenu, setProjectMenuVisibility } from "../../menus/projectMenu/subMenus/redux/menuSlice";

const OnProject = (dispatch: Dispatch, open: boolean) => {
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(!open));
};

export default OnProject;
