import { IsFunction, IsLocation, IsProduct } from ".";
import { LibraryNodeItem, Node } from "../../../../models";

const IsAspectSameType = (aspectNode: Node, node: Node | LibraryNodeItem) => {
  return (
    (IsLocation(aspectNode) && IsLocation(node)) ||
    (IsFunction(aspectNode) && IsFunction(node)) ||
    (IsProduct(aspectNode) && IsProduct(node))
  );
};

export default IsAspectSameType;
