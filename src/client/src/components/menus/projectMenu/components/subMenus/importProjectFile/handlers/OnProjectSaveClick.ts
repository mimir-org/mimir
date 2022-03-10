import { changeActiveMenu } from "../../redux/menuSlice";
import { importProjectAction } from "../../../../../../../redux/store/project/actions";
import { ProjectFileAm } from "../../../../../../../models";
import { Dispatch } from "redux";

const OnProjectSaveClick = (clear: () => void, dispatch: Dispatch, data: ProjectFileAm) => {
  dispatch(importProjectAction(data));
  dispatch(changeActiveMenu(null));
  clear();
};

export default OnProjectSaveClick;
