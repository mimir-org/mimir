import { Dispatch } from "redux";
import { Edge } from "@mimirorg/modelbuilder-types";
import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { IsPartOfRelation } from "../../helpers/Connectors";

/**
 * Component to set the visibility of partOf edges on first render of TreeView.
 * @param edges
 * @param dispatch
 */
const SetInitialEdgeVisibility = (edges: Edge[], dispatch: Dispatch) => {
  const hidden = true;

  // edges?.forEach((e) => {
  //   if (!IsPartOfRelation(e.fromConnector)) dispatch(setEdgeVisibility(e.id, hidden));
  // });
};

// TODO: fix

export default SetInitialEdgeVisibility;
