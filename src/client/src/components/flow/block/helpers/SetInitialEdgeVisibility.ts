import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../helpers";

/**
 * Component to set the visibility of transport edges on first render of BlockView.
 * @param project
 * @param dispatch
 */
const SetInitialEdgeVisibility = (project: Project, dispatch: Dispatch) => {
  project?.edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) dispatch(setEdgeVisibility(edge, false));
  });
};

export default SetInitialEdgeVisibility;
