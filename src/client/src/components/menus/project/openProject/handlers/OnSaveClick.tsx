import { setAccountMenuVisibility } from "../../../project/redux/actions";
import { get } from "../../../../../redux/store/project/actions";

const OnSaveClick = (dispatch: any, projectId: string, setConfirm: any) => {
  dispatch(get(projectId));
  setConfirm(false);
  dispatch(get(projectId));
  // dispatch(save(currentProject));
  dispatch(setAccountMenuVisibility(false));
};

export default OnSaveClick;
