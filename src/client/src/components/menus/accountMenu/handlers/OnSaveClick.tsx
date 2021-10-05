import { ProjectState } from "../../../../redux/store/project/types";
import { setAccountMenuVisibility } from "../../../../redux/store/projectMenu/actions";
import { save } from "../../../../redux/store/project/actions";

const OnSaveClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(setAccountMenuVisibility(false));
  if (projectState.project) dispatch(save(projectState.project));
};

export default OnSaveClick;
