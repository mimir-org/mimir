import { setAccountMenuVisibility } from "../../../project/redux/actions";
import { get } from "../../../../../redux/store/project/actions";

const OnNoSaveClick = (dispatch: any, projectId: string, setConfirm: any) => {
  dispatch(get(projectId));
  setConfirm(false);
  dispatch(setAccountMenuVisibility(false));
};

export default OnNoSaveClick;
