import { Node } from "../../../../../../models";
import { GetParent } from "../../../../helpers";
import { removeMainNodes } from "../../../connectView/redux/actions";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";

const OnParentClick = (dispatch: any, node: Node) => {
  const parentNode = GetParent(node);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(parentNode.id));
  dispatch(setActiveNode(parentNode.id, true));
  dispatch(removeMainNodes());
};

export default OnParentClick;
