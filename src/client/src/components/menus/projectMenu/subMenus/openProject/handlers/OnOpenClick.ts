import { ViewType, VIEW_TYPE } from "../../../../../../models/project/project";
import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/actions";
import { Dispatch } from "redux";
import { changeFlowView } from "../../../../../../redux/store/flow/actions";
import { get } from "../../../../../../redux/store/project/actions";
import { Project } from "../../../../../../models";

const OnOpenClick = (projectId: string, project: Project, dispatch: Dispatch) => {
  dispatch(get(projectId, project));
  dispatch(changeFlowView(VIEW_TYPE.TREEVIEW as ViewType));
  dispatch(setProjectMenuVisibility(false));
  dispatch(changeActiveMenu(null));
};

export default OnOpenClick;
