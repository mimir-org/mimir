import { IsDirectChild } from "../../../components/flow/block/helpers";
import { IsFamily } from "../../../components/flow/helpers";
import { Node } from "../../../models";

const IsChecked = (node: Node, selectedNode: Node, secondaryNode: Node) => {
  if (node?.id === selectedNode?.id) return true;

  // if (IsDirectChild(node, selectedNode)) return !node.isHidden;

  if (secondaryNode) {
    // if (IsDirectChild(node, secondaryNode) && IsFamily(node, secondaryNode)) return true;
    if (node?.id === secondaryNode.id) return true;
    return false;
  }
};

export default IsChecked;
