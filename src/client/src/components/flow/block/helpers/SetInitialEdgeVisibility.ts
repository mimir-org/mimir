import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsLocationTerminal, IsProductTerminal, IsTransport } from "../../helpers/Connectors";

/**
 * Component to set the visibility of transport edges on first render of BlockView.
 * @param project
 * @param dispatch
 */
const SetInitialEdgeVisibility = (project: Project, dispatch: Dispatch) => {
  const hidden = false;

  project?.edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector)) dispatch(setEdgeVisibility(edge, hidden));
    if (IsProductTerminal(edge.fromConnector)) dispatch(setEdgeVisibility(edge, hidden));
    if (IsLocationTerminal(edge.fromConnector)) dispatch(setEdgeVisibility(edge, hidden));
  });
};

export default SetInitialEdgeVisibility;
