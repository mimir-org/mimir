import { Dispatch } from "redux";
import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsPartOfTerminal } from "../../helpers/Connectors";

/**
 * Component to set the visibility of transport edges on first render of BlockView.
 * @param edges
 * @param dispatch
 */
const SetInitialEdgeVisibility = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = false;

  edges?.forEach((edge) => {
    if (!IsPartOfTerminal(edge.fromConnector)) dispatch(setEdgeVisibility(edge.id, hidden));
  });
};

export default SetInitialEdgeVisibility;
