import { Dispatch } from "redux";
import { setFilterMenuVisibility } from "../../menus/projectMenu/components/subMenus/redux/menuSlice";

const OnFilterClick = (dispatch: Dispatch, open: boolean) => {
  dispatch(setFilterMenuVisibility(!open));
};

export default OnFilterClick;
