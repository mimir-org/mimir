import { changeActiveMenu, setProjectMenuVisibility } from "../../menus/projectMenu/subMenus/redux/actions";

const OnProject = (dispatch: any, open: boolean) => {
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(!open));
};

export default OnProject;
