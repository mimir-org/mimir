import { IsFunction, IsLocation, IsProduct } from ".";
import { Node, LibraryNodeItem } from "../../../../models/project";

const IsAspectSameType = (aspectNode: Node, node: Node | LibraryNodeItem) => {
  return (
    (IsLocation(aspectNode) && IsLocation(node)) ||
    (IsFunction(aspectNode) && IsFunction(node)) ||
    (IsProduct(aspectNode) && IsProduct(node))
  );
};

export default IsAspectSameType;
