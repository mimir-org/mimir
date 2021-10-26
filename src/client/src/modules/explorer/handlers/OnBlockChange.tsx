import { setActiveBlockNode, setActiveNode } from "../../../redux/store/project/actions";
import { Node } from "../../../models";
import { setSecondaryNode, removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { IsFamily } from "../../../components/flow/helpers";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * @param node
 * @param selectedNode
 * @param secondaryNode
 * @param dispatch
 */
export const OnBlockChange = (node: Node, selectedNode: Node, secondaryNode: Node, dispatch: any) => {
  if (selectedNode && secondaryNode) {
    if (node === selectedNode && node !== secondaryNode) {
      dispatch(setActiveNode(secondaryNode.id, true));
      dispatch(removeSecondaryNode());
      return;
    }
  }

  // Toggle off selectedNode
  if (node === selectedNode && selectedNode && !secondaryNode) {
    dispatch(setActiveNode(null, false));
    return;
  }

  // Set one node
  if (!selectedNode) {
    dispatch(setActiveNode(node?.id, !node.isSelected));
    dispatch(setActiveBlockNode(node?.id));
    return;
  }

  // Set SecondaryNode
  if (node !== selectedNode && node !== secondaryNode && !IsFamily(node, selectedNode)) {
    dispatch(setSecondaryNode(node));
    return;
  }

  // Remove SecondaryNode
  if (selectedNode && node === secondaryNode) {
    dispatch(removeSecondaryNode());
  }
};

export default OnBlockChange;
