import { IsFunctionNode, IsLocationNode, IsProductNode } from ".";
import { Node, LibraryNodeItem } from "../../../../models/project";

const IsAspectSameType = (aspectNode: Node, node: Node | LibraryNodeItem) => {
  return (
    (IsLocationNode(aspectNode) && IsLocationNode(node)) ||
    (IsFunctionNode(aspectNode) && IsFunctionNode(node)) ||
    (IsProductNode(aspectNode) && IsProductNode(node))
  );
};

export default IsAspectSameType;
