import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../redux/store/project/actions";
import { Node } from "../../../models";
import { setSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { IsDirectChild } from "../../../components/flow/block/helpers";

export const OnBlockChange = (node: Node, selectedNode: Node, secondaryNode: Node, dispatch: any) => {
  const activeNode = !node.isSelected ? node.id : null;

  // Set one node
  if (!selectedNode) {
    dispatch(setActiveNode(activeNode, !node.isSelected));
    dispatch(setActiveBlockNode(activeNode));
    dispatch(setSecondaryNode(null));
  }

  if (selectedNode) {
    // Set SecondaryNode
    if (node.id !== selectedNode.id && node.id !== secondaryNode?.id && !IsDirectChild(node, selectedNode)) {
      dispatch(setSecondaryNode(node));
      dispatch(setActiveNode(selectedNode.id, true));
    }
    // Remove SecondaryNode
    if (node.id === secondaryNode?.id) dispatch(setSecondaryNode(null));

    if (node.id === selectedNode.id) {
      dispatch(setActiveNode(activeNode, !node.isSelected));
    }
    // Toggle visibility on child nodes
    if (IsDirectChild(node, selectedNode)) {
      dispatch(setNodeVisibility(node, false));
    }
  }
};

export default OnBlockChange;
