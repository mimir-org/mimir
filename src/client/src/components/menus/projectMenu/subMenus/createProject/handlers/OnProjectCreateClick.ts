import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { create } from "../../../../../../redux/store/project/actions";
import { changeFlowView } from "../../../../../../redux/store/flow/flowSlice";
import { VIEW_TYPE, ViewType } from "../../../../../../models/project";
import { Dispatch } from "redux";

const OnProjectCreateClick = (dispatch: Dispatch, projectName: string) => {
  dispatch(create(projectName, projectName));
  dispatch(changeFlowView(VIEW_TYPE.TREEVIEW as ViewType));
  dispatch(setProjectMenuVisibility(false));
  dispatch(changeActiveMenu(null));
};

export default OnProjectCreateClick;
