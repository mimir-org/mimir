import { IsAspectNode } from "../../../../../../helpers/Aspects";
import { IsDirectChild } from "../../../../../../helpers/Family";
import { Node } from "../../../../../../models";

/**
 * Component to determine if a node in the BlockExplorer should have the mini checkmark checked.
 * The mini checkmark is the identifier for a child of the selectedNode, and its visibility.
 * @param node
 * @param secondaryNodeId
 * @param selectedNode
 * @returns a boolean value.
 */
export const IsMiniCheckBox = (node: Node, secondaryNodeId: string, selectedNode: Node) => {
  const noSelectedNode = selectedNode === undefined || selectedNode === null;
  if (noSelectedNode || IsAspectNode(node)) return false;

  const isVisible = !node.blockHidden;
  const isNotSelectedNode = !node.selected;
  const isNotSecondaryNode = node.id !== secondaryNodeId;
  const isDirectChild = IsDirectChild(node, selectedNode);

  return isVisible && isNotSelectedNode && isNotSecondaryNode && isDirectChild;
};
