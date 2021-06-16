import { Node, LibraryNodeItem, Aspect } from "../../../../models/project";

const IsFunctionNode = (node: Node | LibraryNodeItem) => {
  return node?.aspect === Aspect.Function;
};

export default IsFunctionNode;
