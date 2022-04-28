import { changeActiveMenu } from "../../redux/menuSlice";
import { changeSelectedProject, closeProject } from "../../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";
import { changeFlowView } from "../../../../../../../redux/store/flow/flowSlice";
import { ViewType, VIEW_TYPE } from "../../../../../../../models/project";

const OnProjectCloseClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(null));
  dispatch(changeFlowView(VIEW_TYPE.STARTPAGE as ViewType));
  dispatch(changeSelectedProject(null));
  dispatch(closeProject());
};

export default OnProjectCloseClick;
