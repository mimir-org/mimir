import { Node } from "../../../../../models";
import { removeConnectNodes, removeMainNode } from "../redux/actions";

const OnClearAllClick = (dispatch: any, node: Node) => {
  dispatch(removeConnectNodes(node));
  dispatch(removeMainNode(node));
};

export default OnClearAllClick;
