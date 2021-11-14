import { changeActiveMenu, setProjectMenuVisibility } from "../../menus/project/redux/actions";

const OnProject = (dispatch: any, open: boolean) => {
  if (open) dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(!open));
};

export default OnProject;
