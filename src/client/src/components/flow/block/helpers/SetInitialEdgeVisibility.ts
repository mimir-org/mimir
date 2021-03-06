import { Dispatch } from "redux";
import { Edge } from "../../../../models";
import { IsRelationEdge } from "../../../../modules/inspector/components/tabs/helpers";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../helpers/Connectors";

/**
 * Component to set the visibility of transport edges on first render of BlockView.
 * @param edges
 * @param dispatch
 */
const SetInitialEdgeVisibility = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = false;

  edges?.forEach((edge) => {
    if (IsTransport(edge.fromConnector) || IsTransport(edge.toConnector) || IsRelationEdge(edge))
      dispatch(setEdgeVisibility(edge.id, hidden));
  });
};

export default SetInitialEdgeVisibility;
