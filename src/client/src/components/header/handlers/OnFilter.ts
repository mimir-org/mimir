import { setTreeFilterMenuVisibility, setBlockFilterMenuVisibility } from "../../menus/projectMenu/subMenus/redux/actions";

const OnFilter = (dispatch: any, open: boolean, treeView: boolean) => {
  treeView ? dispatch(setTreeFilterMenuVisibility(!open)) : dispatch(setBlockFilterMenuVisibility(!open));
};

export default OnFilter;