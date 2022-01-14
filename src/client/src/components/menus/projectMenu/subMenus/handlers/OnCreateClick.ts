import { changeActiveMenu } from "../redux/menuSlice";
import { create } from "../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnCreateClick = (dispatch: Dispatch) => {
  dispatch(create("unnamed", "unnamed"));
  dispatch(changeActiveMenu(null));
};
export default OnCreateClick;
