import { Dispatch } from "redux";
import { Edge } from "../../../../models";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsPartOfTerminal } from "../../helpers/Connectors";

/**
 * Component to set the visibility of partOf edges on first render of TreeView.
 * @param edges
 * @param dispatch
 */
const SetInitialEdgeVisibility = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = true;

  edges?.forEach((e) => {
    if (!IsPartOfTerminal(e.fromConnector)) dispatch(setEdgeVisibility(e.id, hidden));
  });
};

export default SetInitialEdgeVisibility;
