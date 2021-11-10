import { IsDirectChild, IsFamily, IsProduct } from "../../../../helpers";
import { Node, Project } from "../../../../models";

const IsChecked = (project: Project, node: Node, selectedNode: Node, secondaryNode: Node) => {
  if (IsProduct(selectedNode)) {
    if (node?.id === selectedNode?.id) return true;
    if (IsFamily(node, selectedNode) && node.level > selectedNode.level) return true;
  }

  if (node?.id === selectedNode?.id) return true;
  if (node?.id === secondaryNode?.id) return true;
  if (IsFamily(node, selectedNode) && IsDirectChild(node, selectedNode)) return true;
  if (IsFamily(node, secondaryNode) && IsDirectChild(node, secondaryNode)) return true;

  return false;
};

export default IsChecked;
