import { Node } from "../../../../../../models";
import { GetParent } from "../../../../helpers";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnParentClick = (dispatch: Dispatch, node: Node) => {
  const parentNode = GetParent(node?.id);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(parentNode?.id));
  dispatch(setActiveNode(parentNode?.id, true));
};

export default OnParentClick;
