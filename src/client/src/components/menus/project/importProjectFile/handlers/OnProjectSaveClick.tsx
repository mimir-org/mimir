import { changeActiveMenu, setAccountMenuVisibility } from "../../../project/redux/actions";
import { importProjectAction } from "../../../../../redux/store/project/actions";
import { ProjectAm } from "../../../../../redux/sagas/project/ConvertProject";

const OnProjectSaveClick = (dispatch: any, data: () => ProjectAm) => {
  const project = data();
  dispatch(importProjectAction(project));
  dispatch(changeActiveMenu(null));
  dispatch(setAccountMenuVisibility(false));
};

export default OnProjectSaveClick;
