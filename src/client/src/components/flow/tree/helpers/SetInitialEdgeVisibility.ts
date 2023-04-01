import { Dispatch } from "redux";
// import { setEdgeVisibility } from "../../../../redux/store/project/actions";
import { Connection } from "lib";

/**
 * Component to set the visibility of partOf edges on first render of TreeView.
 * @param edges
 * @param dispatch
 */
const SetInitialEdgeVisibility = (edges: Connection[], dispatch: Dispatch) => {
  const hidden = true;

  edges?.forEach((e) => {
    // if (!IsPartOfRelation(e.fromConnector)) {
    //   // TODO: Resolve this
    //   // dispatch(setEdgeVisibility(e.id, hidden));
    // }
  });
};

export default SetInitialEdgeVisibility;
