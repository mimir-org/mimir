import { IsAspectNode } from "../../../../../../helpers/Aspects";
import { IsDirectChild } from "../../../../../../helpers/Family";
import { Node } from "../../../../../../models";

/**
 * Component to determine if a node in the BlockExplorer should have the mini checkmark checked.
 * The mini checkmark is the identifier for a child of the selectedNode, and its visibility.
 * @param node
 * @param secondaryNode
 * @param selectedNode
 * @returns a boolean value.
 */
export const IsMiniCheckBox = (node: Node, secondaryNode: Node, selectedNode: Node) => {
  const noSelectedNode = selectedNode === undefined || selectedNode === null;
  if (noSelectedNode || IsAspectNode(node)) return false;

  const isDirectChild = ValidateChild(node, selectedNode, secondaryNode);
  const isVisible = !node.blockHidden;
  const isNotSelectedNode = !node.selected;
  const isNotSecondaryNode = node.id !== secondaryNode?.id;

  return isVisible && isDirectChild && isNotSelectedNode && isNotSecondaryNode;
};

function ValidateChild(node: Node, selectedNode: Node, secondaryNode: Node) {
  if (!secondaryNode) return IsDirectChild(node, selectedNode);
  if (secondaryNode && IsDirectChild(node, secondaryNode)) return true;
  if (secondaryNode && IsDirectChild(node, selectedNode)) return true;
  return false;
}
