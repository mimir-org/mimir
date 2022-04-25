import { Dispatch } from "redux";
import { IsDirectChild } from "../../../../helpers/Family";
import { Node } from "../../../../models";
import { setBlockNodeVisibility } from "../../../../redux/store/project/actions";

/**
 * Component to set the visibility of nodes on first render of BlockView.
 * @param nodes
 * @param dispatch
 */
const SetInitialNodeVisibility = (nodes: Node[], selectedNode: Node, dispatch: Dispatch) => {
  dispatch(setBlockNodeVisibility(selectedNode, false));
  console.log("INITIAL: ", selectedNode);

  nodes?.forEach((n) => {
    if (IsDirectChild(n, selectedNode)) dispatch(setBlockNodeVisibility(n, false));
    else dispatch(setBlockNodeVisibility(n, true));
  });
};

export default SetInitialNodeVisibility;
