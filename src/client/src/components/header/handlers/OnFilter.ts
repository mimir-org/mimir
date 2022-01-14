import { Dispatch } from "redux";
import { setFilterMenuVisibility } from "../../menus/projectMenu/subMenus/redux/menuSlice";

const OnFilter = (dispatch: Dispatch, open: boolean) => {
  dispatch(setFilterMenuVisibility(!open));
};

export default OnFilter;
