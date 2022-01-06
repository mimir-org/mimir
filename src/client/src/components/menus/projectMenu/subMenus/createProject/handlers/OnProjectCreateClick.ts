import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { create } from "../../../../../../redux/store/project/actions";
import { changeFlowView } from "../../../../../../redux/store/flow/flowSlice";
import { ViewType, VIEW_TYPE } from "../../../../../../models/project";

const OnProjectCreateClick = (dispatch: any, projectName: string) => {
  dispatch(create(projectName, projectName));
  dispatch(changeFlowView(VIEW_TYPE.TREEVIEW as ViewType));
  dispatch(setProjectMenuVisibility(false));
  dispatch(changeActiveMenu(null));
};

export default OnProjectCreateClick;
