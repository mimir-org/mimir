import { IsDirectChild } from "../../../components/flow/block/helpers";
import { IsFamily } from "../../../components/flow/helpers";
import { Node } from "../../../models";

const IsChecked = (node: Node, selectedNode: Node, splitNode: Node) => {
  if (node?.id === selectedNode?.id) return true;
  if (IsDirectChild(node, selectedNode) && IsFamily(node, selectedNode)) return true;
  if (node?.id === splitNode?.id) return true;
  if (splitNode) if (IsDirectChild(node, splitNode) && IsFamily(node, splitNode)) return true;
  return false;
};

export default IsChecked;
