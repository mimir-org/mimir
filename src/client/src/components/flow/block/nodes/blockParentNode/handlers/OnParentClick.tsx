import { Node } from "../../../../../../models";
import { GetParent } from "../../../../helpers";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";

const OnParentClick = (dispatch: any, node: Node) => {
  const parentNode = GetParent(node);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(parentNode.id));
  dispatch(setActiveNode(parentNode.id, true));
};

export default OnParentClick;
