import { Dispatch } from "redux";
import { Node } from "../../../../models";
import { setBlockNodeVisibility } from "../../../../redux/store/project/actions";

/**
 * Component to set the visibility of nodes on first render of BlockView.
 * @param nodes
 * @param dispatch
 */
const SetInitialNodeVisibility = (nodes: Node[], dispatch: Dispatch) => {
  const hidden = true;

  nodes?.forEach((n) => {
    if (n.selected) dispatch(setBlockNodeVisibility(n, false));
    else dispatch(setBlockNodeVisibility(n, true));
  });
};

export default SetInitialNodeVisibility;
