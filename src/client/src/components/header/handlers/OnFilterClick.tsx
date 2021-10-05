import { setFilterMenuVisibility } from "../../../redux/store/projectMenu/actions";

const OnFilterClick = (dispatch: any, open: boolean) => {
  dispatch(setFilterMenuVisibility(!open));
};

export default OnFilterClick;
