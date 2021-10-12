import { changeActiveMenu, setAccountMenuVisibility } from "../../../project/redux/actions";
import { create } from "../../../../../redux/store/project/actions";

const OnProjectCreateClick = (dispatch: any, projectName: string) => {
  dispatch(create(projectName, projectName));
  dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(false));
};

export default OnProjectCreateClick;
