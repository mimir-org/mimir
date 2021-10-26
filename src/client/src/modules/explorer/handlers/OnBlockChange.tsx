import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { setSecondaryNode, removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { IsDirectChild } from "../../../components/flow/block/helpers";
import { IsFamily } from "../../../components/flow/helpers";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * @param project
 * @param elements
 * @param node
 * @param selectedNode
 * @param secondaryNode
 * @param dispatch
 */
export const OnBlockChange = (
  project: Project,
  elements: any[],
  node: Node,
  selectedNode: Node,
  secondaryNode: Node,
  dispatch: any
) => {
  let isParent = false;
  const edge = project?.edges.find((e) => e.fromNodeId === node?.id);
  if (edge) isParent = true;

  const activeNode = !node.isSelected ? node.id : null;

  if (selectedNode) {
    // Toggle off selectedNode
    if (node?.id === selectedNode?.id) dispatch(setActiveNode(null, false));
  }

  //Set one node
  if (!selectedNode) {
    dispatch(setActiveNode(activeNode, !node.isSelected));
    dispatch(setActiveBlockNode(activeNode));
    dispatch(removeSecondaryNode());
  }

  // Set SecondaryNode
  if (node?.id !== selectedNode?.id && node?.id !== secondaryNode?.id && !IsFamily(node, selectedNode)) {
    dispatch(setSecondaryNode(node));
    project.nodes.forEach((n) => {
      if (
        n.id !== selectedNode?.id &&
        n.id !== node?.id &&
        !IsDirectChild(n, node)
        // !IsDirectChild(n, node) &&
        // !IsFamily(n, selectedNode) &&
        // !IsFamily(n, node)
      )
        n.isHidden = true;
    });
  }

  // Remove SecondaryNode
  if (selectedNode && node?.id === secondaryNode?.id) {
    dispatch(removeSecondaryNode());
  }

  dispatch(setNodeVisibility(node, isParent));
};

export default OnBlockChange;
