import { changeActiveMenu } from "../redux/menuSlice";
import { create } from "../../../../../redux/store/project/actions";

const OnCreateClick = (dispatch: any) => {
  dispatch(create("unnamed", "unnamed"));
  dispatch(changeActiveMenu(null));
};
export default OnCreateClick;
