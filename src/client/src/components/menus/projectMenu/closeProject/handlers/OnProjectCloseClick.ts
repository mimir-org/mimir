// import { changeActiveMenu } from "../../redux/menuSlice";
// import { changeSelectedProject, closeProject } from "../../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";
import { setViewType } from "store/reducers/commonReducer";
import { ViewType } from "lib";

const OnProjectCloseClick = (dispatch: Dispatch) => {
  // dispatch(changeActiveMenu(null));
  dispatch(setViewType({ view: ViewType.Home }));
  // dispatch(changeSelectedProject(null));
  // dispatch(closeProject());
};

export default OnProjectCloseClick;
