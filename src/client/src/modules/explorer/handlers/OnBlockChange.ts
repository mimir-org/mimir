import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../redux/store/project/actions";
import { Node } from "../../../models";
import { setSecondaryNode, removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { IsParentOf } from "../../../components/flow/helpers";
import { setLocation3D } from "../../location/redux/actions";
import { IsFamily, IsDirectChild, IsProduct } from "../../../helpers";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * Currently two parentNodes can be displayed at the same time - selectedNode and secondaryNode
 * Two parentNodes of the same Aspect can be displayed, unless it is a direct parent/child relation.
 * @param node
 * @param selectedNode
 * @param secondaryNode
 * @param dispatch
 */
export const OnBlockChange = (node: Node, selectedNode: Node, secondaryNode: Node, dispatch: any) => {
  dispatch(setLocation3D(false));

  if (selectedNode && secondaryNode) {
    if (node === selectedNode && node !== secondaryNode) {
      dispatch(setActiveNode(secondaryNode.id, true));
      dispatch(removeSecondaryNode());
      return;
    }
  }

  // Set selectNode
  if (!selectedNode) {
    dispatch(setActiveNode(node?.id, !node.isSelected));
    dispatch(setActiveBlockNode(node?.id));
    return;
  }

  // Handling Product
  if (IsProduct(selectedNode)) {
    if (!IsProduct(node)) {
      dispatch(setActiveNode(node?.id, !node.isSelected));
      dispatch(setActiveBlockNode(node?.id));
    }
    if (IsProduct(node) && node.id !== selectedNode.id) dispatch(setNodeVisibility(node, false));
    if (node === selectedNode) dispatch(setActiveNode(null, false));
    return;
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
    if (!IsProduct(selectedNode)) dispatch(setSecondaryNode(node)); // ProductNode can not have a secondary node.
    return;
  }

  // Remove SecondaryNode
  if (node === secondaryNode) dispatch(removeSecondaryNode());
};

function validateSiblings(node: Node, selected: Node, secondary: Node, dispatch: any) {
  if (IsDirectChild(node, selected)) dispatch(setNodeVisibility(node, true));
  if (!IsDirectChild(node, selected) && !IsParentOf(node, selected)) dispatch(setSecondaryNode(node));
  if (!IsDirectChild(node, selected) && node === secondary) dispatch(removeSecondaryNode());
}

export default OnBlockChange;