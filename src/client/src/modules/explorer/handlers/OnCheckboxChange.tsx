import { removeMainNodes } from "../../../components/flow/block/connectView/redux/actions";
import { Node } from "../../../models";
import { setSplitParentNode } from "../../../redux/store/splitView/actions";
import { IsConnectView } from "../../../components/flow/block/connectView/helpers";
import { IsFunction, IsProduct, IsLocation } from "../../../components/flow/helpers";
import { setActiveNode, setActiveBlockNode, setActiveEdge } from "../../../redux/store/project/actions";

/**
 * Function to handle checkbox clicks in BlockView.
 * @param dispatch
 * @param splitView
 * @param node
 * @param selectedNode
 * @param splitViewNode
 */
const OnCheckboxChange = (dispatch: any, splitView: boolean, node: Node, selectedNode: Node, splitViewNode: Node) => {
  if (IsConnectView()) dispatch(removeMainNodes());

  if (!splitView) {
    IsFunction(node) || IsProduct(node) || IsLocation(node)
      ? dispatch(setActiveNode(node.id, true))
      : dispatch(setActiveEdge(null, false));
    dispatch(setActiveBlockNode(node.id));

    return;
  }

  // In SplitView two boxes can be checked, one for ActiveNode(left) and one for SplitViewParent(right)
  if (node === selectedNode) dispatch(setActiveNode(node.id, true));
  if (node !== selectedNode && node.aspect === selectedNode.aspect) dispatch(setActiveNode(node.id, true));
  if (node !== selectedNode && node.aspect !== selectedNode.aspect) dispatch(setSplitParentNode(node));
};

export default OnCheckboxChange;
