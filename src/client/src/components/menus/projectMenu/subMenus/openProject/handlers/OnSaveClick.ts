import { setProjectMenuVisibility } from "../../redux/actions";
import { get } from "../../../../../../redux/store/project/actions";

const OnSaveClick = (dispatch: any, projectId: string, setConfirm: any) => {
  dispatch(get(projectId));
  setConfirm(false);
  dispatch(get(projectId));
  // dispatch(save(currentProject));
  dispatch(setProjectMenuVisibility(false));
};

export default OnSaveClick;
