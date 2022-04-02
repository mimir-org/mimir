import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../../../../redux/store/project/actions";
import { removeSecondaryNode, setSecondaryNode } from "../../../../../../redux/store/secondaryNode/actions";
import { IsParentOf } from "../../../../../../components/flow/helpers";
import { IsDirectChild, IsFamily } from "../../../../../../helpers";
import { Dispatch } from "redux";
import { Node } from "../../../../../../models";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * Currently two parentNodes can be displayed at the same time - selectedNode and secondaryNode
 * Two parentNodes of the same Aspect can be displayed, unless it is a direct parent/child relation.
 * @param node
 * @param selectedNode
 * @param secondaryNode
 * @param dispatch
 */
export const OnBlockChange = (node: Node, selectedNode: Node, secondaryNode: Node, dispatch: Dispatch) => {
  // Set selectNode
  if (!selectedNode) {
    dispatch(setActiveNode(node?.id, !node.isSelected));
    dispatch(setActiveBlockNode(node?.id));
    return;
  }

  if (selectedNode && secondaryNode) {
    if (node === selectedNode && node !== secondaryNode) {
      dispatch(setActiveNode(secondaryNode.id, true));
      dispatch(removeSecondaryNode());
      return;
    }
  }

  // Handling same Aspect
  if (selectedNode && IsFamily(node, selectedNode) && node !== selectedNode) {
    validateSiblings(node, selectedNode, secondaryNode, dispatch);
    return;
  }

  // Toggle off selectedNode
  if (node === selectedNode && selectedNode && !secondaryNode) {
    dispatch(setActiveNode(null, false));
    return;
  }

  // Set SecondaryNode
  if (node !== selectedNode && node !== secondaryNode && !IsFamily(node, selectedNode)) {
    dispatch(setSecondaryNode(node));
    return;
  }

  // Remove SecondaryNode
  if (node === secondaryNode) dispatch(removeSecondaryNode());
};

function validateSiblings(node: Node, selected: Node, secondary: Node, dispatch: Dispatch) {
  if (IsDirectChild(node?.id, selected?.id)) dispatch(setNodeVisibility(node, true));
  if (!IsDirectChild(node?.id, selected?.id) && !IsParentOf(node, selected)) dispatch(setSecondaryNode(node));
  if (!IsDirectChild(node?.id, selected?.id) && node === secondary) dispatch(removeSecondaryNode());
}
