import { ViewType, VIEW_TYPE } from "../../../../../../models/project/project";
import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/actions";
import { Dispatch } from "redux";
import { changeFlowView } from "../../../../../../redux/store/flow/actions";
import { get } from "../../../../../../redux/store/project/actions";

const OnOpenClick = (projectId: string, dispatch: Dispatch) => {
  dispatch(get(projectId));
  dispatch(changeFlowView(VIEW_TYPE.TREEVIEW as ViewType));
  dispatch(setProjectMenuVisibility(false));
  dispatch(changeActiveMenu(null));
};

export default OnOpenClick;
