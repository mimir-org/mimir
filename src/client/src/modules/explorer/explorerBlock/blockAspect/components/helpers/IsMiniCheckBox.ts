import { IsAspectNode } from "../../../../../../helpers/Aspects";
import { IsDirectChild } from "../../../../../../helpers/Family";
import { Node } from "../../../../../../models";

/**
 * Component to determine if a node in the BlockExplorer should have the mini checkmark checked.
 * The mini checkmark is the identifier for a child of the selectedBlockNode, and its visibility.
 * @param node
 * @param secondaryNode
 * @param selectedBlockNode
 * @returns a boolean value.
 */
export const IsMiniCheckBox = (node: Node, secondaryNode: Node, selectedBlockNode: Node) => {
  const noSelectedBlockNode = selectedBlockNode === undefined || selectedBlockNode === null;
  if (noSelectedBlockNode || IsAspectNode(node)) return false;

  const isDirectChild = ValidateChild(node, selectedBlockNode, secondaryNode);
  const isVisible = !node.blockHidden;
  const isNotSelectedNode = !node.blockSelected;
  const isNotSecondaryNode = node.id !== secondaryNode?.id;

  return isVisible && isDirectChild && isNotSelectedNode && isNotSecondaryNode;
};

function ValidateChild(node: Node, selectedBlockNode: Node, secondaryNode: Node) {
  if (!secondaryNode) return IsDirectChild(node, selectedBlockNode);
  if (secondaryNode && IsDirectChild(node, secondaryNode)) return true;
  if (secondaryNode && IsDirectChild(node, selectedBlockNode)) return true;
  return false;
}
