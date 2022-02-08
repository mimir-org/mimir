import { Project } from "../../../../models";
import { save } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers";
import { Dispatch } from "redux";

const OnSaveClick = (dispatch: Dispatch, project: Project): void => {
  const projectCopy = Object.assign({}, project);

  // Remove everything OffPage related
  projectCopy.edges = projectCopy.edges.filter((edge) => !IsOffPage(edge.fromNode) && !IsOffPage(edge.toNode));
  projectCopy.nodes = projectCopy.nodes.filter((node) => !IsOffPage(node));

  dispatch(save(projectCopy));
};

export default OnSaveClick;
