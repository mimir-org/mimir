import { MENU_TYPE, ViewType, VIEW_TYPE } from "../../../../../../models/project/project";
import { changeActiveMenu } from "../../redux/actions";
import { Dispatch } from "redux";
import { changeFlowView } from "../../../../../../redux/store/flow/actions";

const OnOpenClick = (dispatch: Dispatch) => {
  dispatch(changeActiveMenu(MENU_TYPE.PROJECT_MENU));
  dispatch(changeFlowView(VIEW_TYPE.TREEVIEW as ViewType));
};

export default OnOpenClick;
