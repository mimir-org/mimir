import { setFilterMenuVisibility } from "../../../redux/store/projectMenu/actions";

const OnFilter = (dispatch: any, open: boolean) => dispatch(setFilterMenuVisibility(!open));

export default OnFilter;
