import { Dispatch } from "redux";
import { setFilterMenuVisibility } from "../../menus/projectMenu/components/subMenus/redux/menuSlice";

export const OnFilterClick = (dispatch: Dispatch, open: boolean) => {
  dispatch(setFilterMenuVisibility(!open));
};
