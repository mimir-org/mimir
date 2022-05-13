import { VIEW_TYPE, ViewType } from "../../../../../../../models/project";
import { changeActiveMenu } from "../../redux/menuSlice";
import { Dispatch } from "redux";
import { changeFlowView } from "../../../../../../../redux/store/flow/flowSlice";
import { get } from "../../../../../../../redux/store/project/actions";
import { Project } from "../../../../../../../models";

export const OnOpenClick = (projectId: string, project: Project, dispatch: Dispatch) => {
  dispatch(get(projectId, project));
  dispatch(changeFlowView(VIEW_TYPE.TREEVIEW as ViewType));
  dispatch(changeActiveMenu(null));
};
