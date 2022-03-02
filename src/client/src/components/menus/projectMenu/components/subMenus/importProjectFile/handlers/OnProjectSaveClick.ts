import { changeActiveMenu } from "../../redux/menuSlice";
import { importProjectAction } from "../../../../../../../redux/store/project/actions";
import { ProjectFileAm } from "../../../../../../../models";
import { Dispatch } from "redux";

const OnProjectSaveClick = (dispatch: Dispatch, data: ProjectFileAm) => {
  dispatch(importProjectAction(data));
  dispatch(changeActiveMenu(null));
};

export default OnProjectSaveClick;
