import { IsFunctionNode, IsLocationNode, IsProductNode } from ".";
import { Node, LibNode } from "../../../../models/project";

const IsAspectSameType = (aspectNode: Node, node: Node | LibNode) => {
  return (
    (IsLocationNode(aspectNode) && IsLocationNode(node)) ||
    (IsFunctionNode(aspectNode) && IsFunctionNode(node)) ||
    (IsProductNode(aspectNode) && IsProductNode(node))
  );
};

export default IsAspectSameType;
