// import { save } from "../../../../redux/store/project/actions";
import { Project } from "lib";
import { Dispatch } from "redux";

export const OnSaveProjectClick = (dispatch: Dispatch, project: Project) => {
  const projectCopy = Object.assign({}, project);
  // dispatch(save(projectCopy));
};
