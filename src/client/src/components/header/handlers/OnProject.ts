import { changeActiveMenu, setProjectMenuVisibility } from "../../menus/projectMenu/subMenus/redux/menuSlice";

const OnProject = (dispatch: any, open: boolean) => {
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(!open));
};

export default OnProject;
