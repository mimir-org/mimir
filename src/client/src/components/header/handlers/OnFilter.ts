import { setFilterMenuVisibility } from "../../menus/projectMenu/subMenus/redux/actions";

const OnFilter = (dispatch: any, open: boolean) => {
  dispatch(setFilterMenuVisibility(!open));
};

export default OnFilter;
