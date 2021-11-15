import { changeActiveMenu } from "../../../projectMenu/subMenus/redux/actions";
import { create } from "../../../../../redux/store/project/actions";

const OnCreateClick = (dispatch: any) => {
  dispatch(create("unnamed", "unnamed"));
  dispatch(changeActiveMenu(null));
};
export default OnCreateClick;
