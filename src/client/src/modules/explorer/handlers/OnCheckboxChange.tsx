import { removeMainNodes } from "../../../components/flow/block/connectView/redux/actions";
import { Node } from "../../../models";
import { setSplitParentNode } from "../../../redux/store/splitView/actions";
import { IsConnectView } from "../../../components/flow/block/connectView/helpers";
import { IsFunction } from "../../../components/flow/helpers";
import { setActiveNode, setActiveBlockNode, setActiveEdge } from "../../../redux/store/project/actions";

/**
 * Function to handle checkbox clicks in BlockView.
 * @param dispatch
 * @param splitView
 * @param node
 * @param splitViewNode
 */
const OnCheckboxChange = (dispatch: any, splitView: boolean, node: Node, splitViewNode: Node) => {
  console.log({ node });
  console.log({ splitViewNode });
  if (IsConnectView()) dispatch(removeMainNodes());

  if (splitView) {
    IsFunction(node) ? dispatch(setActiveNode(node.id, true)) : dispatch(setSplitParentNode(node));
  } else {
    dispatch(setActiveEdge(null, false));
    dispatch(setActiveBlockNode(node.id));
    dispatch(setActiveNode(node.id, true));
  }
};

export default OnCheckboxChange;
