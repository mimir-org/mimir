import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/actions";

const OnReturnClick = (dispatch: any) => {
  dispatch(changeActiveMenu(null));
  dispatch(dispatch(setProjectMenuVisibility(false)));
};

export default OnReturnClick;
