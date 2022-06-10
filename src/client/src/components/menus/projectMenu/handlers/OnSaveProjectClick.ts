import { Project } from "@mimirorg/modelbuilder-types";
import { save } from "../../../../redux/store/project/actions";
import { IsOffPage } from "../../../../helpers/Aspects";
import { Dispatch } from "redux";

export const OnSaveProjectClick = (dispatch: Dispatch, project: Project) => {
  const projectCopy = Object.assign({}, project);

  // Remove everything OffPage related
  projectCopy.edges = projectCopy.edges.filter((edge) => !IsOffPage(edge.fromNode) && !IsOffPage(edge.toNode));
  projectCopy.nodes = projectCopy.nodes.filter((node) => !IsOffPage(node));

  dispatch(save(projectCopy));
};
