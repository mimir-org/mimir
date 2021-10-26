import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { setSecondaryNode, removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { IsFamily } from "../../../components/flow/helpers";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * @param project
 * @param node
 * @param selectedNode
 * @param secondaryNode
 * @param dispatch
 */
export const OnBlockChange = (project: Project, node: Node, selectedNode: Node, secondaryNode: Node, dispatch: any) => {
  let isParent = false;
  const edge = project?.edges.find((e) => e.fromNodeId === node?.id);
  if (edge) isParent = true;

  // Toggle off selectedNode
  if (selectedNode) {
    if (node?.id === selectedNode?.id) {
      dispatch(setActiveNode(null, false));
      dispatch(setNodeVisibility(node, isParent));
    }
  }

  // Set one node
  if (!selectedNode) {
    dispatch(setActiveNode(node.id, !node.isSelected));
    dispatch(setActiveBlockNode(node.id));
    dispatch(setNodeVisibility(node, isParent));
    return;
  }

  // Set SecondaryNode
  if (node?.id !== selectedNode?.id && node?.id !== secondaryNode?.id && !IsFamily(node, selectedNode)) {
    dispatch(setSecondaryNode(node));
    return;
  }

  // Remove SecondaryNode
  if (selectedNode && node?.id === secondaryNode?.id) {
    dispatch(removeSecondaryNode());
  }
};

export default OnBlockChange;
