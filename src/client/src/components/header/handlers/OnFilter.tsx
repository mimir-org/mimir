import { setFilterMenuVisibility } from "../../menus/project/redux/actions";

const OnFilter = (dispatch: any, open: boolean) => dispatch(setFilterMenuVisibility(!open));

export default OnFilter;
