import { changeActiveMenu, setProjectMenuVisibility } from "../../../../projectMenu/subMenus/redux/actions";
import { importProjectAction } from "../../../../../../redux/store/project/actions";
import { ProjectFileAm } from "../../../../../../models";

const OnProjectSaveClick = (dispatch: any, data: ProjectFileAm) => {
  dispatch(importProjectAction(data));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnProjectSaveClick;
