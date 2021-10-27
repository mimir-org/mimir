import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../redux/store/project/actions";
import { Node } from "../../../models";
import { setSecondaryNode, removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { IsFamily, IsParentOf } from "../../../components/flow/helpers";
import { IsDirectChild } from "../../../components/flow/block/helpers";

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

  // Handling same Aspect
  if (selectedNode && IsFamily(node, selectedNode) && node !== selectedNode) {
    validateSameAspect(node, selectedNode, secondaryNode, dispatch);
    return;
  }

  // Toggle off selectedNode
  if (node === selectedNode && selectedNode && !secondaryNode) {
    dispatch(setActiveNode(null, false));
    return;
  }

  // Set selectNode
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

function validateSameAspect(node: Node, selectedNode: Node, secondaryNode, dispatch: any) {
  if (IsDirectChild(node, selectedNode)) dispatch(setNodeVisibility(node, true));
  if (!IsDirectChild(node, selectedNode) && !IsParentOf(node, selectedNode)) dispatch(setSecondaryNode(node));
  if (!IsDirectChild(node, selectedNode) && node === secondaryNode) dispatch(removeSecondaryNode());
}

export default OnBlockChange;
